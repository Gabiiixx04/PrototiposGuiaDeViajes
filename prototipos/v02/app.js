import { places, restaurants, sports, flightProviders, airportUrl, transferUrl, allItems, suggestedPlan, credits } from './data.js';

const paths = {
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z"/>',
  pin: '<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  food: '<path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-4 2-5 5-5 9h5"/>',
  book: '<path d="M12 6c-3-3-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2ZM12 6v15"/>',
  route: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3 3 3 0 0 0-3-3h-2M18 17v-4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
  leaf: '<path d="M20 3c-2 2-5 1-9 2S3 9 4 14s8 7 12 2c3-4 1-7 4-13Z"/><path d="m3 21 12-12"/>',
  culture: '<path d="m3 9 9-6 9 6H3ZM3 21h18M5 10v7M10 10v7M14 10v7M19 10v7M3 18h18"/>',
  mountain: '<path d="m2 20 7-12 4 6 3-10 7 16H2Z"/><path d="m14 10 2 2 2-2M6 14l3 1 2-3"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M20.9 13a9 9 0 0 1-9.9-9.9A9 9 0 1 0 20.9 13Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
  up: '<path d="m6 15 6-6 6 6"/>',
  down: '<path d="m6 9 6 6 6-6"/>',
  wallet: '<path d="M20 7V4H6a3 3 0 0 0 0 6h15v10H5a2 2 0 0 1-2-2V7M21 12h-5v5h5"/>',
  bag: '<path d="M5 7h14l2 14H3L5 7ZM8 7V5a4 4 0 0 1 8 0v2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.1"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  cloud: '<path d="M7 18a5 5 0 1 1 0-10 7 7 0 0 1 13 3 3.5 3.5 0 0 1-.5 7H7Z"/>',
  sport: '<circle cx="12" cy="12" r="9"/><path d="m8 3 2 5 5 1 4-4M3 11l5 1 2 5-2 4M21 14l-5 1-3 6M10 8l-2 4m2 5 6-2-1-6"/>',
  team: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M21 21v-3a6 6 0 0 0-4-5"/>',
  run: '<circle cx="15" cy="4" r="2"/><path d="m12 8-3 4 5 3-2 6M12 8l4 4h4M9 12l-3 5H2M12 8 8 7 5 9"/>',
  plane: '<path d="m22 2-7 20-4-9-9-4L22 2ZM11 13 22 2"/>',
};
function icon(name, size = 18) { return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`; }
function escape(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
function persist(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
const validId = id => allItems.some(item => item.id === id);
const savedIds = read('ibarra-archivo-v02-saved', []);
let saved = new Set(Array.isArray(savedIds) ? savedIds.filter(validId) : []);
const storedPlan = read('ibarra-archivo-v02-plan', null);
let plan = Array.isArray(storedPlan) ? storedPlan.filter(stop => stop && validId(stop.id) && [1,2,3].includes(stop.day)).filter((stop, index, arr) => arr.findIndex(x => x.id === stop.id) === index) : suggestedPlan.map(stop => ({ ...stop }));
let days = Math.max(1, Math.min(3, Number(read('ibarra-archivo-v02-days', 2)) || 2), ...plan.map(stop => stop.day));
let activeDay = 1;
const packingData = read('ibarra-archivo-v02-packing', []);
let packing = new Set(Array.isArray(packingData) ? packingData : []);
let homeFilter = 'Para ti';
let placeFilter = 'Todos';
let foodFilter = 'Todos';
let sportFilter = 'Todos';
let activityFilter = 'Todas las actividades';
let sortOrder = 'recommended';
let toastTimeout;
const main = document.querySelector('main');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const categoryIcon = category => ({ Naturaleza: 'leaf', Cultura: 'culture', Aventura: 'mountain', Sabores: 'food', Tradicional: 'food', 'Dulces y café': 'spark', 'Con vistas': 'sun', Deporte: 'sport', 'En equipo': 'team', Individual: 'run' }[category] || 'compass');
const navItems = [
  ['inicio', 'Explorar', 'compass', 'Explorar'],
  ['lugares', 'Lugares turísticos', 'pin', 'Lugares'],
  ['restaurantes', 'Dónde comer', 'food', 'Comer'],
  ['deporte', 'Deporte y movimiento', 'sport', 'Deporte'],
  ['guia', 'Guía de viaje', 'book', 'Guía'],
  ['vuelos', 'Vuelos a Ecuador', 'plane', 'Vuelos'],
  ['itinerario', 'Mi itinerario', 'route', 'Mi viaje'],
  ['guardados', 'Mis favoritos', 'heart', 'Favoritos'],
];
function currentRoute() {
  const [page = 'inicio', ...parts] = location.hash.slice(1).split('/');
  let param = '';
  try { param = decodeURIComponent(parts.join('/')); } catch { param = parts.join('/'); }
  return { page: page || 'inicio', param };
}
function updateNav() {
  let page = currentRoute().page;
  if (page === 'lugar') { const type = allItems.find(item => item.id === currentRoute().param)?.type; page = type === 'food' ? 'restaurantes' : type === 'sport' ? 'deporte' : 'lugares'; }
  document.querySelector('#navigation').innerHTML = navItems.map(([id, label, name]) => `${id === 'itinerario' ? '<div class="nav-divider"></div>' : ''}<a href="#${id}" class="nav-link ${page === id ? 'active' : ''}" ${page === id ? 'aria-current="page"' : ''}>${icon(name,18)}<span>${label}</span>${id === 'guardados' && saved.size ? `<span class="nav-count">${saved.size}</span>` : ''}</a>`).join('');
  document.querySelector('#mobile-navigation').innerHTML = navItems.filter(item => item[0] !== 'guia').map(([id, label, name, short]) => `<a href="#${id}" class="${page === id ? 'active' : ''}" ${page === id ? 'aria-current="page"' : ''} aria-label="${label}">${icon(name,19)}<span>${short}${id === 'guardados' && saved.size ? `<span class="mobile-save-count">(${saved.size})</span>` : ''}</span></a>`).join('');
  document.querySelector('#top-trip').innerHTML = `${icon('route',16)} Mi viaje <span class="trip-dot">${plan.length}</span>`;
}
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const button = document.querySelector('#theme-toggle');
  button.innerHTML = icon(dark ? 'sun' : 'moon',18);
  button.setAttribute('aria-label', `Activar modo ${dark ? 'claro' : 'oscuro'}`);
  button.setAttribute('aria-pressed', String(dark));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#10182d' : '#fffaf0';
}
function notify(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2900);
}
function savePlan() { persist('ibarra-archivo-v02-plan', plan); persist('ibarra-archivo-v02-days', days); updateNav(); }
function saveButton(item) {
  return `<button class="save-button ${saved.has(item.id) ? 'saved' : ''}" data-save="${item.id}" aria-pressed="${saved.has(item.id)}" aria-label="${saved.has(item.id) ? 'Quitar de' : 'Añadir a'} favoritos: ${escape(item.name)}" title="${saved.has(item.id) ? 'Quitar de favoritos' : 'Guardar lugar'}">${icon('heart',16)}</button>`;
}
function card(item, index = 0) {
  return `<article class="place-card"><div class="card-picture"><a href="#lugar/${item.id}" tabindex="-1" aria-hidden="true"><img src="./assets/${item.image}.webp" alt="" loading="lazy" width="620" height="410"></a><span class="card-category">${icon(categoryIcon(item.category),12)}${item.category}</span>${saveButton(item)}</div><div class="card-body"><div class="card-title-row"><h3><a href="#lugar/${item.id}">${item.name}</a></h3><a href="#lugar/${item.id}" class="card-arrow" aria-label="Ver ${escape(item.name)}">${icon('diagonal',17)}</a></div><p class="card-description">${item.short}</p>${item.type === 'sport' ? `<div class="sport-tags">${item.activities.map(activity => `<span>${activity}</span>`).join('')}</div><div class="sport-mode">${icon(item.modalities.length > 1 ? 'team' : 'run',13)}${item.modalities.join(' + ')}</div>` : ''}<div class="card-meta"><span>${icon('pin',11)}${item.area}</span>${item.type === 'food' ? `<span>${icon('food',11)}${item.category}</span>` : `<span>${icon('clock',11)}${item.time}</span>`}</div></div></article>`;
}
function filterChips(options, active, target) {
  return `<div class="filters" aria-label="Filtrar por categoría">${options.map(label => `<button type="button" class="filter-chip ${label === active ? 'active' : ''}" data-filter="${target}" data-value="${escape(label)}" aria-pressed="${label === active}">${icon(categoryIcon(label),14)}${label}</button>`).join('')}</div>`;
}
function emptyState(title, message, href = '#lugares', label = 'Encuentra tu próximo lugar', name = 'heart') {
  return `<div class="empty-state"><span class="empty-icon">${icon(name,30)}</span><h2>${title}</h2><p>${message}</p><a href="${href}" class="button green">${label}${icon('arrow',16)}</a></div>`;
}
function home() {
  const items = homeFilter === 'Sabores' ? restaurants.slice(0,3) : homeFilter === 'Deporte' ? sports.slice(0,3) : homeFilter === 'Para ti' ? places.filter(item => item.featured) : places.filter(item => item.category === homeFilter).slice(0,3);
  return `<section class="page-intro"><div><p class="eyebrow">CERCA DE LOS ANDES. LEJOS DE LA RUTINA.</p><h1>Descubre lo que te mueve.</h1></div><div class="intro-note">${icon('spark',14)}Un destino, muchas maneras de vivirlo</div></section>
  <section class="hero" aria-label="Descubre Ibarra"><img src="./assets/hero.webp" alt="Laguna de Yahuarcocha con el volcán Imbabura y la ciudad al fondo" fetchpriority="high" width="1800" height="1205"><div class="hero-copy"><div class="hero-eyebrow"><span></span> LA CIUDAD BLANCA TE ESPERA</div><h2>Ibarra,<br><em>a tu ritmo.</em></h2><p>Entre lagunas, arte y sabores que se quedan contigo. Tu próxima historia empieza aquí.</p><a href="#lugares" class="button primary">Vamos a descubrirla ${icon('arrow',16)}</a></div><div class="hero-coordinates">${icon('globe',13)} ANDES ECUATORIANOS</div><a class="hero-photo-label" href="#lugar/yahuarcocha">${icon('pin',17)}<div><span>ESTÁS MIRANDO</span>Laguna de Yahuarcocha</div><div class="photo-arrow">${icon('diagonal',14)}</div></a><div class="hero-scroll-mark" aria-hidden="true"></div></section>
  <section class="discover-bar"><p class="discover-label">¿Qué te apetece descubrir?</p>${filterChips(['Para ti','Naturaleza','Cultura','Sabores','Aventura','Deporte'],homeFilter,'home')}</section>
  <section aria-labelledby="essentials-title"><div class="section-heading"><div><h2 id="essentials-title">${homeFilter === 'Deporte' ? 'Ibarra se pone en movimiento' : homeFilter === 'Sabores' ? 'Sabores para recordar' : homeFilter === 'Para ti' ? 'Esenciales de Ibarra' : `Un poco de ${homeFilter.toLowerCase()}`}</h2><p>Esos lugares que se quedan contigo.</p></div><a href="${homeFilter === 'Deporte' ? '#deporte' : homeFilter === 'Sabores' ? '#restaurantes' : '#lugares'}" class="text-link">Ver ${homeFilter === 'Deporte' ? 'todos los espacios' : homeFilter === 'Sabores' ? 'dónde comer' : 'todos los lugares'} ${icon('arrow',15)}</a></div><div class="card-grid home-grid">${items.map(card).join('')}</div></section>
  <section class="home-stories" aria-label="Más formas de vivir Ibarra"><article class="food-story"><img src="./assets/helados.webp" alt="Elaboración artesanal de helados de paila de fruta" loading="lazy" width="780" height="438"><div class="food-story-copy"><div class="eyebrow">${icon('food',12)} EL SABOR DE LO NUESTRO</div><h2>Un viaje también<br>se saborea.</h2><p>De un helado de paila a una mesa con tradición. Ven con hambre de descubrir.</p><a href="#restaurantes" class="text-link">Descubre dónde comer ${icon('arrow',15)}</a></div></article><article class="plan-story"><div class="eyebrow">${icon('route',12)} MENOS PLANEAR, MÁS VIVIR</div><h2>48 horas para<br>querer volver.</h2><p>Una ruta con un poco de todo.<br>Tú decides dónde detenerte.</p><a href="#itinerario" class="text-link">Encuentra tu ruta ${icon('arrow',15)}</a><div class="plan-line" aria-hidden="true"><svg viewBox="0 0 80 140" fill="none"><path d="M45 9c-65 24 50 35 4 68-50 36-31 38-4 52" stroke="currentColor" stroke-dasharray="3 5"/><circle cx="45" cy="9" r="6" fill="var(--green-light)" stroke="currentColor"/><circle cx="49" cy="77" r="6" fill="var(--green-light)" stroke="currentColor"/><circle cx="45" cy="129" r="6" fill="var(--green-light)" stroke="currentColor"/><circle cx="45" cy="9" r="2" fill="currentColor"/><circle cx="49" cy="77" r="2" fill="currentColor"/><circle cx="45" cy="129" r="2" fill="currentColor"/></svg></div><span class="round-label">HECHA PARA TI ↗</span></article></section>${homeHighlights()}`;
}
function homeHighlights() {
  return `<section class="active-callout" aria-label="Deporte en Ibarra"><span class="callout-symbol">${icon('sport',36)}</span><div><p class="eyebrow">PONLE MOVIMIENTO A TU ESCAPADA</p><h2>Un partido. Una ruta. Tu mejor plan.</h2><p>Descubre canchas para tu equipo y lugares para entrenar a tu aire.</p></div><a href="#deporte" class="button primary">Encuentra dónde jugar ${icon('arrow',16)}</a></section>${flightCallout()}`;
}
function flightCallout() {
  return `<aside class="flight-callout"><span class="flight-callout-icon">${icon('plane',29)}</span><div><span class="eyebrow">PRÓXIMA PARADA: ECUADOR</span><h2>Ese viaje a Ibarra empieza aquí.</h2><p>Busca vuelos a Quito (UIO) y continúa por carretera hasta Ibarra.</p></div><a href="#vuelos" class="button green">Ver opciones de vuelos ${icon('diagonal',16)}</a></aside>`;
}
function sportsPage() {
  const items = sports.filter(item => {
    if (sportFilter !== 'Todos' && !item.modalities.includes(sportFilter)) return false;
    const activities = sportFilter === 'En equipo' ? item.teamActivities : sportFilter === 'Individual' ? item.individualActivities : item.activities;
    return activityFilter === 'Todas las actividades' || activities.includes(activityFilter);
  });
  const activities = [...new Set(sports.flatMap(item => item.activities))].sort((a,b) => a.localeCompare(b,'es'));
  return `<section class="sport-hero"><div><div class="eyebrow">AL AIRE LIBRE. A TU MANERA.</div><h1>Ibarra también<br><em>se mueve.</em></h1><p>Reúne a tu equipo o sal a entrenar a tu ritmo. Aquí tienes lugares para jugar, rodar y sumar pasos.</p><div class="sport-hero-labels"><span>${icon('team',16)}Con tu equipo</span><span>${icon('run',16)}A tu aire</span></div></div><div class="sport-hero-photo"><img src="./assets/ciudad-blanca.webp" alt="Parque Ciudad Blanca de Ibarra" width="900" height="900"><span>${icon('pin',14)}Parque Ciudad Blanca</span></div></section>
  <div class="collection-toolbar sport-toolbar">${filterChips(['Todos','En equipo','Individual'],sportFilter,'sport')}<label class="activity-select">Tu actividad <select id="sport-activity"><option value="Todas las actividades">Todas las actividades</option>${activities.map(activity => `<option value="${activity}" ${activity === activityFilter ? 'selected' : ''}>${activity}</option>`).join('')}</select></label></div>
  <div class="section-heading"><div><h2>Encuentra tu próximo terreno de juego.</h2><p>${items.length} ${items.length === 1 ? 'espacio para moverte' : 'espacios para moverte'}${sportFilter === 'Todos' ? '' : ` · ${sportFilter.toLowerCase()}`}</p></div></div>
  ${items.length ? `<div class="card-grid sports-grid">${items.map(card).join('')}</div>` : `<div class="sport-empty"><div class="empty-state"><span class="empty-icon">${icon('sport',30)}</span><h2>Cambiamos de plan, seguimos en movimiento.</h2><p>No hay espacios para esa combinación en la guía. Cambia la modalidad o la actividad para ver otras opciones.</p><button class="button green" id="reset-sports">Ver todos los espacios ${icon('arrow',15)}</button></div></div>`}
  <p class="planner-note">${icon('info',15)}Consulta la disponibilidad de canchas, posibles reservas y accesos en cada lugar. Las fichas permiten guardar el espacio y añadirlo a tu itinerario.</p>`;
}
function flights() {
  return `<section class="flights-hero"><div><div class="eyebrow">HAZ QUE EL PLAN DESPEGUE</div><h1>Destino: Ibarra.<br><em>Primera parada: Quito.</em></h1><p>Busca tu billete al aeropuerto Mariscal Sucre de Quito (UIO) y completa el viaje por carretera hasta la Ciudad Blanca.</p><a class="button green" href="${flightProviders[0].url}" target="_blank" rel="noopener noreferrer">${icon('plane',17)}Buscar billetes en Despegar ${icon('diagonal',15)}</a></div><div class="flight-stamp" aria-hidden="true"><div>ECUADOR TE ESPERA</div>${icon('plane',65)}<strong>UIO</strong><span>QUITO → IBARRA</span></div></section>
  <section class="arrival-route" aria-label="Etapas para llegar a Ibarra"><div><span class="arrival-icon">${icon('globe',22)}</span><div><small>01 · ELIGE TU ORIGEN</small><h3>Tu ciudad</h3></div></div><span class="arrival-connector">${icon('arrow',19)}</span><div><span class="arrival-icon">${icon('plane',22)}</span><div><small>02 · LLEGA EN AVIÓN</small><h3>Quito · UIO</h3></div></div><span class="arrival-connector">${icon('arrow',19)}</span><div><span class="arrival-icon">${icon('pin',22)}</span><div><small>03 · CONTINÚA POR TIERRA</small><h3>Ibarra</h3></div></div></section>
  <section aria-labelledby="agency-title"><div class="section-heading"><div><h2 id="agency-title">Elige dónde buscar tu vuelo.</h2><p>Selecciona tu ciudad de salida, fechas y viajeros en la web del proveedor.</p></div></div><div class="agency-grid">${flightProviders.map(provider => `<article class="agency-card ${provider.primary ? 'featured-agency' : ''}"><div class="agency-heading"><span>${icon(provider.primary ? 'plane' : 'search',24)}</span><small>${provider.type}</small></div><h3>${provider.name}</h3><p>${provider.description}</p><a href="${provider.url}" target="_blank" rel="noopener noreferrer" class="button ${provider.primary ? 'green' : 'outline'}">${provider.label} ${icon('diagonal',15)}</a></article>`).join('')}</div><p class="planner-note">${icon('info',15)}Los enlaces se abren en una nueva pestaña. La selección y la compra del billete se realizan en la agencia o proveedor que elijas; allí verás sus precios y condiciones.</p></section>
  <aside class="transfer-card"><div class="transfer-icon">${icon('route',29)}</div><div><div class="eyebrow">EL ÚLTIMO TRAMO TAMBIÉN CUENTA</div><h2>Del aeropuerto a Ibarra.</h2><p>Organiza tu traslado por carretera según tu hora de llegada. Consulta la ruta y los servicios de transporte del aeropuerto antes de salir.</p><div class="transfer-links"><a href="${transferUrl}" target="_blank" rel="noopener noreferrer" class="text-link">Ver ruta a Ibarra ${icon('diagonal',14)}</a><a href="${airportUrl}" target="_blank" rel="noopener noreferrer" class="text-link">Aeropuerto de Quito ${icon('diagonal',14)}</a></div></div><a href="#itinerario" class="button outline">Planifica tus días ${icon('arrow',15)}</a></aside>`;
}
function collection(type) {
  const food = type === 'food';
  const active = food ? foodFilter : placeFilter;
  let items = (food ? restaurants : places).filter(item => active === 'Todos' || item.category === active);
  if (sortOrder === 'name') items = [...items].sort((a,b) => a.name.localeCompare(b.name,'es'));
  const options = food ? ['Todos','Tradicional','Dulces y café','Con vistas'] : ['Todos','Naturaleza','Cultura','Aventura'];
  return `<section class="inner-intro"><div class="eyebrow">${food ? 'MESAS, SABORES Y BUENOS MOMENTOS' : 'TU SIGUIENTE GRAN RECUERDO'}</div><h1>${food ? 'Ibarra se disfruta a la mesa.' : 'Sal a encontrar tu lugar.'}</h1><p>${food ? 'Recetas con historia, una pausa dulce y restaurantes para alargar la sobremesa. ¿Por dónde empezamos?' : 'Una laguna, una plaza, un taller. Descubre la Ciudad Blanca y sus alrededores, a tu manera.'}</p></section>
  <div class="collection-toolbar">${filterChips(options,active,food ? 'food' : 'places')}<span class="result-count">${items.length} ${food ? 'paradas para saborear' : 'lugares para descubrir'}</span></div>
  ${food ? `<aside class="food-banner">${icon('spark',21)}<div><strong>Hay sabores que solo se entienden aquí.</strong><p>Empieza con un helado de paila y deja espacio para las carnes coloradas. Consulta el menú y los horarios en cada local.</p></div></aside>` : `<label class="sort-select">Ordenar por <select id="sort-places"><option value="recommended" ${sortOrder === 'recommended' ? 'selected' : ''}>Nuestra selección</option><option value="name" ${sortOrder === 'name' ? 'selected' : ''}>Nombre: A–Z</option></select></label>`}
  <div class="card-grid ${food ? 'food-grid' : ''}">${items.map(card).join('')}</div><p class="planner-note">${icon('info',14)}${food ? 'Cada ficha incluye su fuente y un enlace para localizar el establecimiento.' : 'Los tiempos de visita son orientativos para ayudarte a planear con calma.'}</p>`;
}
function favorites() {
  const items = allItems.filter(item => saved.has(item.id));
  return `<section class="inner-intro"><div class="eyebrow">TU PEQUEÑA COLECCIÓN DE GRANDES PLANES</div><h1>Lo que te hace querer ir.</h1><p>Guarda ese lugar, esa mesa o ese paisaje. Aquí estarán cuando quieras volver a ellos.</p></section>${items.length ? `<div class="section-heading"><p>${items.length} ${items.length === 1 ? 'favorito' : 'favoritos'} en tu colección</p><a href="#itinerario" class="text-link">Vamos a armar el viaje ${icon('arrow',15)}</a></div><div class="card-grid">${items.map(card).join('')}</div><p class="planner-note">${icon('heart',14)}Tus favoritos se guardan en este navegador.</p>` : emptyState('Tu próxima historia aún está por guardar.', 'Pulsa el corazón en cualquier tarjeta y crea tu colección de lugares de Ibarra.')}`;
}
function detail(id) {
  const item = allItems.find(item => item.id === id);
  if (!item) return notFound();
  const food = item.type === 'food';
  const sport = item.type === 'sport';
  const added = plan.find(stop => stop.id === id);
  const similar = (food ? restaurants : sport ? sports : places).filter(other => other.id !== id).slice(0,3);
  const backHref = food ? '#restaurantes' : sport ? '#deporte' : '#lugares';
  const backLabel = food ? 'Volver a dónde comer' : sport ? 'Volver a deporte y movimiento' : 'Volver a lugares';
  return `<a class="back-link" href="${backHref}">${icon('back',15)}${backLabel}</a>
  <article><section class="detail-hero"><img src="./assets/${item.image}.webp" alt="${escape(item.name)}" width="1400" height="850"><span class="detail-category">${icon(categoryIcon(item.category),14)}${item.category}</span>${saveButton(item)}<div><p class="eyebrow">${item.tag}</p><h1>${item.name}</h1></div></section>
  <div class="detail-columns"><div class="detail-content"><h2>${food ? 'Una buena razón para hacer una pausa.' : sport ? 'Encuentra tu forma de moverte.' : 'Hay que estar aquí para sentirlo.'}</h2><p>${item.description}</p>
  ${sport ? `<div class="detail-sport-info"><div class="sport-mode">${icon(item.modalities.length > 1 ? 'team' : 'run',16)}${item.modalities.join(' + ')}</div><div class="sport-tags">${item.activities.map(activity => `<span>${activity}</span>`).join('')}</div></div>` : ''}
  <h3>${sport ? 'Antes de ponerte en marcha' : 'Para disfrutarlo un poco más'}</h3><ul class="tip-list">${item.tips.map(tip => `<li>${icon('check',16)}<span>${tip}</span></li>`).join('')}</ul><a class="source-link" href="${item.source}" target="_blank" rel="noopener noreferrer">${icon('book',13)}${item.sourceName}${icon('diagonal',12)}</a>
  ${item.extraSource ? `<br><a class="source-link" href="${item.extraSource}" target="_blank" rel="noopener noreferrer">${icon('book',13)}${item.extraSourceName}${icon('diagonal',12)}</a>` : ''}</div>
  <aside class="detail-side" aria-label="Planificar esta visita"><div class="detail-fact">${icon('pin',20)}<div><small>DÓNDE ENCONTRARLO</small><strong>${item.area}</strong></div></div><div class="detail-fact">${icon(food ? 'food' : sport ? 'sport' : 'clock',20)}<div><small>${food ? 'PARA PROBAR' : sport ? 'ACTIVIDADES' : 'TÓMATE TU TIEMPO'}</small><strong>${item.specialty || item.time + ' de visita sugerida'}</strong></div></div>
  <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}" target="_blank" rel="noopener noreferrer" class="button outline">Ver ubicación ${icon('diagonal',15)}</a>
  <div class="day-label"><label for="add-day">${added ? 'Ya forma parte de tu viaje' : 'Añadir a mi itinerario'}</label>${added ? `<span>Día ${added.day}</span>` : `<select id="add-day">${Array.from({length:days},(_,i) => `<option value="${i+1}" ${i+1 === activeDay ? 'selected' : ''}>Día ${i+1}</option>`).join('')}</select>`}</div>
  <button class="button green" data-add="${id}">${icon(added ? 'check' : 'plus',16)}${added ? 'Ver en mi itinerario' : 'Me lo apunto'}</button><p class="small-note">${sport ? 'Consulta en el lugar si necesitas reservar una cancha. ' : ''}Tu itinerario y tus favoritos se guardan en este navegador.</p></aside></div></article>
  <section class="related"><div class="section-heading"><div><h2>${sport ? 'Más lugares para moverte.' : 'La historia continúa.'}</h2><p>Unas cuantas paradas que también pueden gustarte.</p></div></div><div class="card-grid">${similar.map(card).join('')}</div></section>`;
}
function guide() {
  const checklist = ['Calzado cómodo para caminar','Protector solar y sombrero','Una capa ligera para la lluvia','Botella de agua reutilizable','Abrigo para la tarde','Espacio para un recuerdo local'];
  const faqs = [
    ['¿Cómo llegar a Ibarra?', 'Si viajas en avión, busca vuelos a Quito (UIO) y continúa por carretera hasta Ibarra. Puedes consultar agencias desde la sección Vuelos a Ecuador. Para llegar por tierra, hay conexiones con Quito y otras ciudades de la Sierra norte. Para viajar en transporte público, consulta las rutas y salidas vigentes hacia la terminal de Ibarra. El tiempo del trayecto depende del tráfico y del punto de salida.'],
    ['¿Cómo moverse por la ciudad?', 'El centro se disfruta a pie. Para Yahuarcocha, San Antonio y las parroquias rurales, combina transporte local o taxi según tu ruta. Acuerda el precio o consulta el servicio antes de empezar el trayecto.'],
    ['¿Qué ropa llevar?', 'Piensa en capas: protección solar para el día y abrigo ligero para la tarde. En los alrededores de montaña puede refrescar y llover. Lleva agua y consulta el clima antes de una caminata.'],
    ['¿Qué sabores no me puedo perder?', 'Helados de paila, nogadas y arrope de mora en el centro; pan de leche y helados de crema en Caranqui; carnes coloradas en El Alpargate y tilapia en Yahuarcocha. Pregunta por ingredientes y opciones en cada local.'],
    ['¿Cómo conocer la cultura local?', 'Visita los talleres de San Antonio y las iniciativas comunitarias de La Esperanza. Pide permiso para hacer fotografías y acuerda las experiencias directamente con los anfitriones y guías de la zona.'],
  ];
  return `<section class="guide-hero"><div class="guide-hero-copy"><div class="eyebrow">UN POCO DE INFORMACIÓN. MUCHAS GANAS.</div><h1>Ven con ganas.<br>El resto, aquí.</h1><p>Lo esencial para llegar, moverte y disfrutar de Ibarra sin llenar el viaje de prisas.</p></div><div class="guide-hero-photo"><img src="./assets/esperanza.webp" alt="Plaza y paisaje andino de La Esperanza" width="1400" height="738"></div></section>
  <section class="guide-facts" aria-label="Datos prácticos"><div class="guide-fact">${icon('wallet',22)}<div><strong>Dólar estadounidense</strong><small>Moneda · USD</small></div></div><div class="guide-fact">${icon('globe',22)}<div><strong>Español</strong><small>Idioma de uso habitual</small></div></div><div class="guide-fact">${icon('clock',22)}<div><strong>UTC −5</strong><small>Hora de Ecuador continental</small></div></div><div class="guide-fact">${icon('cloud',22)}<div><strong>Clima de los Andes</strong><small>Capas ligeras, siempre a mano</small></div></div></section>
  <section class="guide-columns"><div><h2>Antes de salir.</h2><div class="faq-list">${faqs.map(([q,a],i) => `<details ${i === 0 ? 'open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div><aside class="packing-card"><div class="eyebrow">POCO EQUIPAJE. BUENOS PLANES.</div><h2>¿Lo llevas todo?</h2><p>Marca lo que ya tienes en tu mochila.</p>${checklist.map((label,i) => `<label class="packing-row"><input type="checkbox" data-pack="${i}" ${packing.has(i) ? 'checked' : ''}><span>${label}</span></label>`).join('')}<a href="#itinerario" class="text-link">Y ahora, a elegir la ruta ${icon('arrow',15)}</a></aside></section>
  ${flightCallout()}<aside class="guide-cta"><div><h3>¿Te gusta llevar el mapa contigo?</h3><p>Consulta el mapa turístico urbano del Municipio de Ibarra.</p></div><a class="button outline" href="https://visitibarra.ec/assets/docs/Mapa%20Ibarra%20Urbano.pdf" target="_blank" rel="noopener noreferrer">Ver mapa turístico ${icon('diagonal',15)}</a></aside>`;
}
function itinerary() {
  activeDay = Math.min(activeDay,days);
  const stops = plan.filter(stop => stop.day === activeDay);
  return `<section class="inner-intro"><div class="eyebrow">TÚ PONES EL RITMO. NOSOTROS LAS IDEAS.</div><h1>Un viaje muy tuyo.</h1><p>Una ruta sugerida para empezar. Añade tus lugares, cambia el orden y deja espacio para lo inesperado.</p></section><div class="planner-layout"><section aria-label="Organizar mis días"><div class="planner-controls"><div class="segmented" role="group" aria-label="Elegir día">${Array.from({length:days},(_,i) => `<button data-day="${i+1}" class="${activeDay === i+1 ? 'active' : ''}" aria-pressed="${activeDay === i+1}">Día ${i+1}</button>`).join('')}</div><label class="duration-control">Mi escapada de <select id="trip-duration">${[1,2,3].map(n => `<option value="${n}" ${days === n ? 'selected' : ''}>${n} ${n === 1 ? 'día' : 'días'}</option>`).join('')}</select></label></div><div class="day-heading"><h2>${activeDay === 1 ? 'El placer de llegar.' : activeDay === 2 ? 'Un poquito más allá.' : 'Todavía queda por vivir.'}</h2><span>${stops.length} ${stops.length === 1 ? 'parada' : 'paradas'}</span></div>${stops.length ? `<div class="itinerary-list">${stops.map((stop,i) => {
    const item = allItems.find(item => item.id === stop.id);
    return `<article class="stop-card"><span class="stop-number">${i+1}</span><a class="stop-image" href="#lugar/${item.id}" aria-label="Ver ${escape(item.name)}"><img src="./assets/${item.image}.webp" alt="" loading="lazy" width="200" height="200"></a><div class="stop-info"><div class="eyebrow">${item.category} · ${item.type === 'food' ? 'A tu ritmo' : item.time}</div><h3><a href="#lugar/${item.id}">${item.name}</a></h3><p>${item.area}</p><a class="text-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}" target="_blank" rel="noopener noreferrer">Ver ubicación ${icon('diagonal',11)}</a></div><div class="stop-controls"><button data-move="${item.id}" data-direction="-1" ${i === 0 ? 'disabled' : ''} aria-label="Subir ${escape(item.name)}">${icon('up',14)}</button><button data-move="${item.id}" data-direction="1" ${i === stops.length-1 ? 'disabled' : ''} aria-label="Bajar ${escape(item.name)}">${icon('down',14)}</button><button class="remove" data-remove="${item.id}" aria-label="Quitar ${escape(item.name)} del viaje">${icon('trash',13)}</button></div></article>`;
  }).join('')}</div>` : emptyState('Un día lleno de posibilidades.', 'Elige un lugar y añádelo a este día desde su ficha.', '#lugares', 'Descubrir lugares', 'route')}<a href="#lugares" class="add-stop">${icon('plus',16)}Añadir una nueva parada</a><p class="planner-note">${icon('info',15)}Esta es una propuesta flexible. Comprueba los accesos y horarios de tus paradas antes de salir.</p></section><aside class="trip-summary"><div class="trip-summary-photo"><img src="./assets/hero.webp" alt="Vista de Yahuarcocha y las montañas de Imbabura" loading="lazy" width="600" height="400"><span>UNA ESCAPADA A IBARRA</span></div><div class="trip-summary-body"><div class="eyebrow">QUE EMPIECE LA HISTORIA</div><h2>Nos vemos<br>en Ibarra.</h2><p>Un poco de naturaleza, algo de cultura y tiempo para disfrutarlo.</p><div class="summary-stats"><div><strong>${String(days).padStart(2,'0')}</strong><span>${days === 1 ? 'día a tu ritmo' : 'días a tu ritmo'}</span></div><div><strong>${String(plan.length).padStart(2,'0')}</strong><span>paradas por descubrir</span></div></div><button class="button green" id="export-plan">${icon('download',15)}Llevarme mi itinerario</button><a href="#guia" class="text-link">Lo esencial antes de salir ${icon('arrow',13)}</a></div></aside></div>`;
}
function search(query) {
  const normalized = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const terms = normalized(query).trim().split(/\s+/).filter(Boolean);
  const items = terms.length ? allItems.filter(item => terms.every(term => normalized(`${item.name} ${item.area} ${item.category} ${item.description} ${item.short} ${(item.activities || []).join(' ')} ${(item.modalities || []).join(' ')}`).includes(term))) : [];
  return `<section class="inner-intro"><div class="eyebrow">SIGUE TU CURIOSIDAD</div><h1>${query ? `Buscando <span class="search-term">“${escape(query)}”</span>` : '¿Qué te apetece descubrir?'}</h1><p>${items.length ? `${items.length} ${items.length === 1 ? 'idea' : 'ideas'} para tu próxima historia en Ibarra.` : 'Prueba con un lugar, un sabor o una experiencia.'}</p></section>${items.length ? `<div class="card-grid">${items.map(card).join('')}</div>` : emptyState('Todavía hay mucho por descubrir.', 'No encontramos coincidencias. Prueba con “laguna”, “helados”, “cultura” o explora todos los lugares.', '#lugares', 'Explorar los lugares', 'search')}`;
}
function sources() {
  const uniqueSources = [...new Map(allItems.map(item => [item.source, item])).values()];
  return `<section class="inner-intro"><div class="eyebrow">DETRÁS DE CADA BUENA HISTORIA</div><h1>Fuentes y créditos.</h1><p>Una guía independiente para descubrir Ibarra. Estas son las referencias que acompañan nuestro contenido.</p></section><section class="sources-content"><h2>Información turística</h2><p>Las descripciones se han elaborado a partir del portal municipal Visit Ibarra, información municipal y las fichas enlazadas. Los tiempos de visita y el itinerario son propuestas editoriales.</p>${uniqueSources.map(item => `<div class="source-card"><div><h3>${item.name}</h3><p>${item.sourceName}</p></div><a href="${item.source}" target="_blank" rel="noopener noreferrer">Consultar fuente ${icon('diagonal',13)}</a></div>`).join('')}<h2>Llegar en avión</h2><p>La sección de vuelos enlaza a la búsqueda de Quito (UIO) y propone continuar por carretera hasta Ibarra. El origen, las fechas, la disponibilidad y la compra se gestionan en la web del proveedor.</p>${flightProviders.map(provider => `<div class="source-card"><div><h3>${provider.name}</h3><p>${provider.type} · Vuelos a Quito</p></div><a href="${provider.url}" target="_blank" rel="noopener noreferrer">Consultar vuelos ${icon('diagonal',13)}</a></div>`).join('')}<div class="source-card"><div><h3>Aeropuerto Internacional Mariscal Sucre</h3><p>Información oficial del aeropuerto de Quito</p></div><a href="${airportUrl}" target="_blank" rel="noopener noreferrer">Consultar aeropuerto ${icon('diagonal',13)}</a></div><h2>Fotografías</h2><ul class="credits-list">${credits.map(([subject,owner,url]) => `<li><span>${subject}</span><a href="${url}" target="_blank" rel="noopener noreferrer">${owner} ↗</a></li>`).join('')}<li><span>La Estelita</span><a href="https://www.tripadvisor.es/Restaurant_Review-g312858-d4558924-Reviews-La_Estelita-Ibarra_Imbabura_Province.html" target="_blank" rel="noopener noreferrer">La Estelita · Tripadvisor ↗</a></li></ul><h2>Tu viaje, en tu navegador</h2><p>El tema, los favoritos, la lista de equipaje y el itinerario se conservan en el almacenamiento local de este navegador. Puedes cambiarlos en cualquier momento. El itinerario puede descargarse como archivo de texto.</p><p class="small-note">Las fotografías pertenecen a sus respectivos autores y se acreditan a sus fuentes. Esta web no representa al Municipio de Ibarra ni a los establecimientos mencionados.</p></section>`;
}
function notFound() { return `<section class="inner-intro"><div class="eyebrow">UN PEQUEÑO DESVÍO</div><h1>Volvamos al camino.</h1></section>${emptyState('Este rincón aún no está en la guía.', 'Pero hay muchos lugares de Ibarra esperándote.', '#inicio', 'Volver a explorar', 'compass')}`; }
function render() {
  const {page,param} = currentRoute();
  const content = ({inicio:home,lugares:() => collection('places'),restaurantes:() => collection('food'),guardados:favorites,deporte:sportsPage,vuelos:flights,lugar:() => detail(param),guia:guide,itinerario:itinerary,buscar:() => search(param),fuentes:sources}[page] || notFound)();
  main.innerHTML = content;
  updateNav();
  const title = page === 'lugar' ? allItems.find(item => item.id === param)?.name : ({inicio:'Qué bonito volver',lugares:'Lugares turísticos',restaurantes:'Dónde comer',guardados:'Mis favoritos',deporte:'Deporte y movimiento',vuelos:'Vuelos para llegar a Ibarra',guia:'Guía de viaje',itinerario:'Mi itinerario',buscar:'Descubre tu próximo plan',fuentes:'Fuentes y créditos'}[page]);
  document.title = `${title || 'Descubre Ibarra'} · Ibarra Viva`;
}
function navigate() {
  if (document.startViewTransition && !reducedMotion.matches) document.startViewTransition(() => { render(); window.scrollTo(0,0); });
  else { render(); window.scrollTo(0,0); }
  main.focus({preventScroll:true});
}
document.addEventListener('click', event => {
  const button = event.target.closest('button');
  if (!button || button.disabled) return;
  if (button.id === 'theme-toggle') {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('ibarra-archivo-v02-theme',theme); } catch {}
    updateThemeButton();
  }
  if (button.dataset.filter) {
    const type = button.dataset.filter;
    if (type === 'home') homeFilter = button.dataset.value;
    if (type === 'places') placeFilter = button.dataset.value;
    if (type === 'food') foodFilter = button.dataset.value;
    if (type === 'sport') sportFilter = button.dataset.value;
    const oldY = window.scrollY;
    render();
    const selected = [...document.querySelectorAll('[data-filter]')].find(el => el.dataset.filter === type && el.dataset.value === button.dataset.value);
    selected?.focus({preventScroll:true});
    window.scrollTo(0,oldY);
  }
  if (button.id === 'reset-sports') { sportFilter = 'Todos'; activityFilter = 'Todas las actividades'; render(); }
  if (button.dataset.save) {
    const id = button.dataset.save;
    if (!validId(id)) return;
    const item = allItems.find(item => item.id === id);
    if (saved.has(id)) { saved.delete(id); notify('Lugar eliminado de tus favoritos.'); }
    else { saved.add(id); notify('Una buena historia, guardada en favoritos.'); }
    persist('ibarra-archivo-v02-saved',[...saved]);
    if (currentRoute().page === 'guardados') render();
    else {
      document.querySelectorAll(`[data-save="${id}"]`).forEach(el => {
        el.classList.toggle('saved',saved.has(id));
        el.setAttribute('aria-pressed',String(saved.has(id)));
        el.setAttribute('aria-label',`${saved.has(id) ? 'Quitar de' : 'Añadir a'} favoritos: ${item.name}`);
        el.title = saved.has(id) ? 'Quitar de favoritos' : 'Guardar lugar';
      });
      updateNav();
    }
  }
  if (button.dataset.add) {
    const id = button.dataset.add;
    if (!validId(id)) return;
    const existing = plan.find(stop => stop.id === id);
    if (existing) { activeDay = existing.day; location.hash = '#itinerario'; }
    else {
      const day = Number(document.querySelector('#add-day')?.value) || activeDay;
      plan.push({id,day:Math.min(day,days)}); savePlan(); render();
      notify(`¡Apuntado! Nueva parada en tu día ${day}.`);
    }
  }
  if (button.dataset.day) { activeDay = Number(button.dataset.day); render(); }
  if (button.dataset.remove) {
    plan = plan.filter(stop => stop.id !== button.dataset.remove); savePlan(); render(); notify('Parada eliminada. Hay espacio para nuevas ideas.');
  }
  if (button.dataset.move) {
    const sameDay = plan.filter(stop => stop.day === activeDay);
    const index = sameDay.findIndex(stop => stop.id === button.dataset.move);
    const target = index + Number(button.dataset.direction);
    if (target < 0 || target >= sameDay.length) return;
    const first = plan.findIndex(stop => stop.id === sameDay[index].id);
    const second = plan.findIndex(stop => stop.id === sameDay[target].id);
    [plan[first],plan[second]] = [plan[second],plan[first]];
    savePlan(); render(); notify('El orden de tus paradas se ha actualizado.');
  }
  if (button.id === 'export-plan') {
    const lines = ['IBARRA VIVA · MI ITINERARIO','Qué bonito volver.',''];
    for (let day=1;day<=days;day++) {
      lines.push(`DÍA ${day}`,'────────────────────────');
      const stops = plan.filter(stop => stop.day === day);
      if (!stops.length) lines.push('Un día abierto a nuevas historias.');
      stops.forEach((stop,i) => {
        const item = allItems.find(item => item.id === stop.id);
        lines.push(`${i+1}. ${item.name}`,`   ${item.area}`,`   ${item.type === 'food' ? item.specialty : 'Visita sugerida: '+item.time}`,`   https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}`,'');
      });
      lines.push('');
    }
    lines.push('Ruta orientativa. Consulta horarios y accesos antes de salir.','Más información turística: https://visitibarra.ec/');
    const url = URL.createObjectURL(new Blob(['\ufeff'+lines.join('\n')],{type:'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a'); anchor.href=url; anchor.download='Mi-viaje-a-Ibarra.txt'; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url),1000);
    notify('Tu itinerario, listo para acompañarte.');
  }
});
document.addEventListener('change',event => {
  if (event.target.id === 'sport-activity') { activityFilter = event.target.value; render(); document.querySelector('#sport-activity')?.focus({preventScroll:true}); }
  if (event.target.id === 'sort-places') { sortOrder=event.target.value; render(); }
  if (event.target.id === 'trip-duration') {
    const count=Number(event.target.value);
    if (![1,2,3].includes(count)) return;
    const moved = plan.some(stop => stop.day > count);
    days=count; plan=plan.map(stop => ({...stop,day:Math.min(stop.day,days)})); activeDay=Math.min(activeDay,days); savePlan(); render();
    if (moved) notify('Las paradas se han reunido en el último día de tu viaje.');
  }
  if (event.target.dataset.pack !== undefined) {
    const index=Number(event.target.dataset.pack);
    if (event.target.checked) packing.add(index); else packing.delete(index);
    persist('ibarra-archivo-v02-packing',[...packing]);
  }
});
document.querySelector('#search-form').addEventListener('submit',event => {
  event.preventDefault();
  const query=document.querySelector('#global-search').value.trim();
  if (!query) { document.querySelector('#global-search').focus(); return; }
  const hash=`#buscar/${encodeURIComponent(query)}`;
  if (location.hash === hash) navigate(); else location.hash=hash;
});
document.querySelector('#location-label').innerHTML=`${icon('pin',14)}<strong>Ibarra, Imbabura</strong><span class="slash">/</span>Tu guía local`;
document.querySelector('#search-icon').innerHTML=icon('search',16);
document.querySelector('#note-icon').innerHTML=icon('spark',23);
window.addEventListener('hashchange',navigate);
updateThemeButton();
render();
