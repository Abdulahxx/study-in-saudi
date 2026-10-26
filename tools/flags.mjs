// Флаги стран как inline SVG: эмодзи-флаги в Windows показываются буквами.
// flag('ksa'|'uae'|'qatar'|'turkey'|'academy', className?) → строка SVG 3:2.

const svg = (inner, cls) =>
  `<svg class="flag${cls ? ' ' + cls : ''}" viewBox="0 0 30 20" aria-hidden="true" focusable="false">${inner}</svg>`;

const qatarTeeth = (() => {
  // белая полоса слева с 9 зубцами
  const h = 20 / 9;
  let d = 'M0 0H8';
  for (let i = 0; i < 9; i++) d += `L11 ${(i + 0.5) * h}L8 ${(i + 1) * h}`;
  return d + 'H0Z';
})();

const FLAGS = {
  ksa:
    '<rect width="30" height="20" fill="#006C35"/>' +
    '<path d="M8 7.2h14M9.5 9.2h11" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/>' +
    '<path d="M7 13.5h15.5l1.2-.7" stroke="#fff" stroke-width=".9" fill="none" stroke-linecap="round"/>' +
    '<path d="M8.6 12.6v1.8" stroke="#fff" stroke-width=".9"/>',
  uae:
    '<rect width="30" height="20" fill="#fff"/><rect width="30" height="6.67" fill="#00732F"/>' +
    '<rect y="13.33" width="30" height="6.67" fill="#000"/><rect width="8" height="20" fill="#FF0000"/>',
  qatar: `<rect width="30" height="20" fill="#8A1538"/><path d="${qatarTeeth}" fill="#fff"/>`,
  turkey:
    '<rect width="30" height="20" fill="#E30A17"/><circle cx="11" cy="10" r="5" fill="#fff"/>' +
    '<circle cx="12.25" cy="10" r="4" fill="#E30A17"/>' +
    '<path d="M16.2 10l3.9-1.27-2.41 3.32V7.95l2.41 3.32z" fill="#fff"/>',
  academy:
    '<rect width="30" height="20" fill="#8F5A20"/>' +
    '<path d="M15 3.5l1.9 4.6 4.6 1.9-4.6 1.9-1.9 4.6-1.9-4.6-4.6-1.9 4.6-1.9z" fill="#F1E4D1"/>',
};

export function flag(key, className = '') {
  return FLAGS[key] ? svg(FLAGS[key], className) : '';
}
