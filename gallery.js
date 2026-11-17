import { versions, excludedPrompt, allPrompts } from './prompts.js';

const paths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  compare: '<rect x="3" y="4" width="7" height="16" rx="1"/><rect x="14" y="4" width="7" height="16" rx="1"/>',
  text: '<path d="M4 5h16M4 10h16M4 15h11M4 20h8"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M12 17v4M8 21h8"/>',
  tablet: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M11 18h2"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 5h4M11 18h2"/>',
  reset: '<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',
  expand: '<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M8 21H3v-5"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3M12 14v3"/>',
  play: '<path d="m9 5 11 7-11 7V5Z"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  hand: '<path d="M8 13V5a2 2 0 0 1 4 0v6-1a2 2 0 0 1 4 0v2a2 2 0 0 1 4 0v5c0 4-2 5-6 5-3 0-5-2-6-3l-4-4a2 2 0 0 1 3-3l1 1Z"/>',
};
const icon = (name, size = 16) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const main = document.querySelector('main');
let activeVersion = 'v01';
let currentPage = '';
let resizeObservers = [];
let toastTimer;

function toast(message) {
  const element = document.querySelector('#toast');
  clearTimeout(toastTimer);
  element.textContent = message;
  element.classList.add('show');
  toastTimer = setTimeout(() => element.classList.remove('show'), 3200);
}
function copyButton(version) {
  return `<button class="copy-button" type="button" data-copy="${version.id}" aria-label="Copiar el prompt ${version.number}">${icon('copy',13)}Copiar prompt</button>`;
}
function versionCard(version) {
  return `<a href="#galeria/${version.id}" class="version-card ${version.tone} ${activeVersion === version.id ? 'selected' : ''}" ${activeVersion === version.id ? 'aria-current="true"' : ''} aria-label="Ver prototipo ${version.number}: ${version.name}"><div class="version-art"><img src="${version.path}assets/hero.webp" alt="" width="240" height="260"><small>PROTOTIPO</small><span>${version.number}</span></div><div class="version-info"><p class="eyebrow">${version.label}</p><h3>${version.title}</h3><p>${version.summary}</p><div class="version-tags">${version.shortTags.map(tag => `<span>${tag}</span>`).join('')}</div></div><span class="version-selected">${icon('check',10)}VIENDO</span></a>`;
}
function promptPanel(version) {
  return `<aside class="prompt-panel"><div class="prompt-panel-top"><div><div class="eyebrow">LA IDEA DETRÁS DE LA PANTALLA</div><h2>${version.name}.</h2></div><span class="version-pill ${version.tone}">${icon('clock',11)}Versión ${version.number}</span></div><div class="prompt-panel-body"><div class="prompt-label">PROMPT ORIGINAL ${icon('text',13)}</div><p class="prompt-content" data-prompt-content="${version.id}">${escape(version.prompt)}</p>${copyButton(version)}<h3 class="feature-heading">LO QUE TOMÓ FORMA</h3><ul class="feature-list">${version.features.map(feature => `<li>${icon('check',13)}${feature}</li>`).join('')}</ul><p class="version-note">${version.note}</p></div></aside>`;
}
function preview(version, device = 'adaptable') {
  return `<section class="preview-card" data-preview="${version.id}" data-device="${device}" aria-label="Prototipo utilizable ${version.number}"><div class="preview-toolbar"><div class="preview-title"><span class="preview-dot"></span>PROTOTIPO ${version.number}</div><div class="device-controls" role="group" aria-label="Tamaño del prototipo ${version.number}">${[['adaptable','monitor','Adaptable'],['tableta','tablet','Tableta'],['movil','phone','Móvil']].map(([id,name,label]) => `<button type="button" data-device="${id}" class="${device === id ? 'active' : ''}" aria-label="Vista ${label.toLowerCase()} del prototipo ${version.number}" aria-pressed="${device === id}">${icon(name,14)}<span>${label}</span></button>`).join('')}</div><div class="toolbar-actions"><button class="icon-button" type="button" data-reset="${version.id}" aria-label="Reiniciar prototipo ${version.number}" title="Reiniciar esta versión">${icon('reset',15)}</button><button class="icon-button" type="button" data-fullscreen="${version.id}" aria-label="Ampliar prototipo ${version.number}" title="Pantalla completa">${icon('expand',15)}</button></div></div><div class="browser-bar" aria-hidden="true"><div class="browser-dots"><span></span><span></span><span></span></div><span class="browser-path">ibarra viva / ${version.id} / versión original</span></div><div class="preview-stage"><div class="device-surface"><div class="frame-loading">Abriendo una nueva historia…</div><iframe class="prototype-frame" id="prototype-${version.id}" src="${version.path}index.html" title="Ibarra Viva · Prototipo ${version.number}: ${version.name}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" allow="fullscreen"></iframe></div></div><div class="preview-bottom"><span class="micro-label">${icon('play',11)}<span data-size-label>Prototipo interactivo</span></span><a class="text-link" href="${version.path}index.html" target="_blank" rel="noopener noreferrer">Abrir versión completa ${icon('diagonal',12)}</a></div></section>`;
}
function gallery() {
  const version = versions.find(version => version.id === activeVersion);
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow">IBARRA VIVA / DEL PROMPT AL PROTOTIPO</p><h1>Una idea.<br>Dos formas de <em>vivirla.</em></h1></div><div class="hero-side"><p>Las palabras fueron el punto de partida.<br>Explora cómo se convirtieron en una guía de viaje, versión a versión.</p><div class="archive-stats"><div><strong>02</strong><span>prototipos<br>para explorar</span></div><div><strong>03</strong><span>prompts<br>de diseño</span></div></div></div></section>
  <section aria-label="Elegir versión"><div class="section-row"><p class="eyebrow">CADA VERSIÓN, UN NUEVO CAMINO</p><span class="micro-label">${icon('spark',12)}Elige dónde empezar</span></div><div class="version-grid">${versions.map(versionCard).join('')}</div></section>
  <section class="workbench" id="workbench" aria-label="Prompt y prototipo">${promptPanel(version)}${preview(version)}</section>
  <aside class="interaction-note"><div>${icon('hand',18)}<span><strong>Sí, puedes tocarlo todo.</strong> Navega, cambia el tema y crea tu itinerario dentro del prototipo.</span></div><a class="text-link" href="#comparar">Ver las dos versiones juntas ${icon('arrow',14)}</a></aside>`;
}
function compare() {
  return `<section class="view-heading"><div><p class="eyebrow">DOS VERSIONES. UNA MISMA IDEA.</p><h1>Lo que cambia.<br>Lo que permanece.</h1><p>Prueba las dos versiones en paralelo. Cada una conserva sus pantallas, sus funciones y su propio itinerario.</p></div><a href="#galeria/${activeVersion}" class="button outline">Volver a la galería ${icon('arrow',14)}</a></section>
  <section class="compare-grid" aria-label="Comparar prototipos">${versions.map(version => `<article class="compare-column"><header class="compare-version-header"><span class="number-tag ${version.tone}">${version.number}</span><div><h2>${version.title}</h2><p>${version.name}</p></div></header>${preview(version,'movil')}<div class="compare-prompt"><div class="prompt-label">EL PROMPT QUE LO INICIÓ ${icon('text',13)}</div><p class="prompt-content" data-prompt-content="${version.id}">${escape(version.prompt)}</p>${copyButton(version)}<p>${version.note}</p></div></article>`).join('')}</section>
  <aside class="archive-callout"><span>${icon('lock',22)}</span><div><h2>El archivo se detiene aquí.</h2><p>El último prototipo queda excluido. Su prompt se conserva en el historial para completar el proceso de diseño.</p></div><a class="text-link" href="#prompts">Recorrer los prompts ${icon('arrow',14)}</a></aside>`;
}
function promptHistory() {
  return `<section class="view-heading"><div><p class="eyebrow">EL PROCESO, EN TUS PALABRAS.</p><h1>Tres prompts.<br>Un viaje que toma forma.</h1><p>Los mensajes originales de diseño, en el orden en que se escribieron. Cada idea al lado de lo que llegó a ser.</p></div><button type="button" class="button outline" id="download-prompts">${icon('download',15)}Descargar los prompts</button></section>
  <section class="prompt-timeline" aria-label="Historial de prompts de diseño">${allPrompts.map((version,index) => {
    const excluded = index === 2;
    return `<article class="timeline-entry ${excluded ? 'timeline-excluded' : ''}"><span class="timeline-number">${version.number}</span><div class="timeline-card"><header class="timeline-header"><div><p class="eyebrow">${excluded ? 'ÚLTIMO CAMBIO DE DISEÑO' : version.label}</p><h2>${version.title}</h2></div><span class="status-pill ${excluded ? 'excluded' : version.tone}">${icon(excluded ? 'lock' : 'play',11)}${excluded ? 'Prototipo excluido' : 'Prototipo utilizable'}</span></header><div class="prompt-block"><div class="prompt-label">PROMPT ${version.number} / TEXTO ORIGINAL</div><p class="prompt-content" data-prompt-content="${version.id}">${escape(version.prompt)}</p>${copyButton(version)}</div><div class="timeline-bottom"><p class="timeline-summary">${version.summary}</p>${excluded ? `<div class="excluded-note">${icon('lock',15)}<p>Se conserva el prompt y se omite su prototipo, tal como has pedido.</p></div>` : `<a href="#galeria/${version.id}" class="button green">Probar versión ${version.number} ${icon('diagonal',14)}</a>`}</div></div></article>`;
  }).join('')}</section><p class="history-footnote">Texto original, sin corregir ortografía ni puntuación. Solo se documentan los prompts de diseño de la web.</p>`;
}
function preparePreviews() {
  document.querySelectorAll('[data-preview]').forEach(card => {
    const frame = card.querySelector('iframe');
    frame.addEventListener('load', () => card.querySelector('.frame-loading')?.classList.add('hidden'));
    const surface = card.querySelector('.device-surface');
    const label = card.querySelector('[data-size-label]');
    const updateSize = () => { label.textContent = `${Math.round(surface.clientWidth)} px · Navegación real`; };
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(updateSize);
      observer.observe(surface);
      resizeObservers.push(observer);
    }
    updateSize();
  });
}
function render() {
  const [rawPage, rawVersion] = location.hash.slice(1).split('/');
  if (rawPage === 'contenido') { main.focus(); return; }
  const page = ['galeria','comparar','prompts'].includes(rawPage) ? rawPage : 'galeria';
  if (versions.some(version => version.id === rawVersion)) activeVersion = rawVersion;
  const scrollY = currentPage === page ? window.scrollY : 0;
  resizeObservers.forEach(observer => observer.disconnect());
  resizeObservers = [];
  main.innerHTML = ({galeria:gallery, comparar:compare, prompts:promptHistory}[page])();
  document.querySelector('#navigation').innerHTML = [['galeria','grid','Galería'],['comparar','compare','Comparar'],['prompts','text','Los prompts']].map(([id,name,label]) => `<a href="#${id}" class="nav-link ${page === id ? 'active' : ''}" ${page === id ? 'aria-current="page"' : ''}>${icon(name,14)}${label}</a>`).join('');
  document.title = `${{galeria:'Del prompt al prototipo',comparar:'Compara las versiones',prompts:'Los prompts originales'}[page]} · Ibarra Viva`;
  currentPage = page;
  preparePreviews();
  window.scrollTo(0,scrollY);
}
async function copyPrompt(id) {
  const prompt = allPrompts.find(prompt => prompt.id === id);
  if (!prompt) return;
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(prompt.prompt);
    toast(`Prompt ${prompt.number} copiado.`);
  } catch {
    const content = document.querySelector(`[data-prompt-content="${id}"]`);
    if (!content) return;
    const range = document.createRange();
    range.selectNodeContents(content);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    toast('El prompt está seleccionado. Usa Copiar en tu dispositivo.');
  }
}
document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.device) {
    const card = button.closest('[data-preview]');
    card.dataset.device = button.dataset.device;
    card.querySelectorAll('[data-device]').forEach(control => {
      const selected = control.dataset.device === button.dataset.device;
      control.classList.toggle('active',selected);
      control.setAttribute('aria-pressed',String(selected));
    });
  }
  if (button.dataset.copy) await copyPrompt(button.dataset.copy);
  if (button.dataset.reset) {
    const version = versions.find(version => version.id === button.dataset.reset);
    if (!version) return;
    try { ['theme','saved','plan','days','packing'].forEach(key => localStorage.removeItem(`ibarra-archivo-${version.id}-${key}`)); } catch {}
    const frame = document.querySelector(`#prototype-${version.id}`);
    frame.closest('[data-preview]').querySelector('.frame-loading').classList.remove('hidden');
    frame.src = `${version.path}index.html`;
    toast(`Prototipo ${version.number} reiniciado.`);
  }
  if (button.dataset.fullscreen) {
    const card = button.closest('[data-preview]');
    try {
      if (document.fullscreenElement === card) await document.exitFullscreen();
      else if (card.requestFullscreen) await card.requestFullscreen();
      else throw new Error('Fullscreen unavailable');
    } catch {
      toast('Usa «Abrir versión completa» para probar el prototipo a tamaño completo.');
    }
  }
  if (button.id === 'download-prompts') {
    const text = ['IBARRA VIVA · DEL PROMPT AL PROTOTIPO','Prompts de diseño originales.','',...allPrompts.flatMap(prompt => [`PROMPT ${prompt.number} · ${prompt.name}`,prompt.prompt,prompt.id === excludedPrompt.id ? 'Estado: prototipo excluido de la galería.' : `Estado: prototipo ${prompt.number} utilizable.`,''])].join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff'+text],{type:'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'Ibarra-Viva-prompts-de-diseno.txt';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    toast('Los tres prompts, listos para guardar.');
  }
});
window.addEventListener('hashchange',() => { render(); main.focus({preventScroll:true}); });
render();
