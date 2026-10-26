# Ставит подписанные фото вузов на сайт: уменьшает до 1600 px и кладёт в assets/img/unis/<slug>.jpg.
# Папку с фото задаёт $src; файлы, которых в ней нет, пропускаются. После запуска: node tools/build.mjs
Add-Type -AssemblyName System.Drawing
if (-not $src) { $src = 'C:\Users\abudi\Desktop\фото' }
$dst = 'C:\Users\abudi\Desktop\SAYT\assets\img\unis'
$map = [ordered]@{
  'Исламский университет Медины.png' = 'islamic-university-madinah'
  'Исламский университет имама Мухаммада ибн Сауда.jpg' = 'imam-muhammad-ibn-saud'
  'Катарский университет.jpg' = 'qatar-university'
  'Университет Аль-Джауф.jpg' = 'jouf'
  'Университет Аль-Касим.jpeg' = 'qassim'
  'Университет Аль-Маджмаа.jpg' = 'majmaah'
  'Университет Биши.jpg' = 'bisha'
  'Университет Джизана.jpg' = 'jazan'
  'Университет Наджрана.webp' = 'najran'
  'Университет Северных границ.jpeg' = 'northern-border'
  'Университет Табука.webp' = 'tabuk'
  'Университет Тайба.jpg' = 'taibah'
  'Университет Умм аль-Кура.jpg' = 'umm-al-qura'
  'Университет Хаиля.jpeg' = 'hail'
  'Университет короля Абдул Азиза.jpg' = 'king-abdulaziz'
  'Университет короля Сауда.jpeg' = 'king-saud'
  'Университет короля Фейсала.jpg' = 'king-faisal'
  'Университет короля Халида.png' = 'king-khalid'
  'Университет принца Саттама ибн Абдул Азиза.jpg' = 'prince-sattam'
  'Университет принцессы Нуры бинт Абдуррахман.png' = 'princess-nourah'
  'университет аль-Касимия.jpg' = 'alqasimia'
  'Джидда.jpg' = 'jeddah'
  'Таиф.jpg' = 'taif'
  'Университет имама Абдуррахмана.jpg' = 'imam-abdulrahman'
  'Хафр-эль-Батин.jpg' = 'hafr-al-batin'
  'Шакра.jpg' = 'shaqra'
}
$enc = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$ep = New-Object System.Drawing.Imaging.EncoderParameters 1
$ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), 85L
$maxW = 1600
foreach ($name in $map.Keys) {
  $slug = $map[$name]
  $in = Join-Path $src $name
  if (-not (Test-Path -LiteralPath $in)) { continue }
  # старое фото этого вуза (с Wikimedia) убираем, чтобы не было двух вариантов
  foreach ($ext in 'jpg','webp') { $old = Join-Path $dst "$slug.$ext"; if (Test-Path $old) { Remove-Item $old -Confirm:$false } }
  if ($name -like '*.webp') {
    Copy-Item -LiteralPath $in (Join-Path $dst "$slug.webp")
    "$slug <- $name (webp как есть)"
    continue
  }
  $img = [System.Drawing.Image]::FromFile($in)
  $w = [Math]::Min($maxW, $img.Width); $h = [int]($img.Height * $w / $img.Width)
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::White)
  $g.DrawImage($img, 0, 0, $w, $h)
  $bmp.Save((Join-Path $dst "$slug.jpg"), $enc, $ep)
  $g.Dispose(); $bmp.Dispose(); $img.Dispose()
  "$slug <- $name (${w}x$h)"
}
