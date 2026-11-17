export const versions = [
  {
    id: 'v01', number: '01', title: 'La primera escapada.', name: 'La guía esencial',
    tone: 'forest', label: 'EL PUNTO DE PARTIDA', path: './prototipos/v01/',
    summary: 'Una primera guía para descubrir Ibarra con calma: sus lugares, sus sabores y una ruta propia.',
    prompt: 'Diseñame una pagina web que incluya apps multipantalla,cards,transiciones, que tenga modo claro oscuro, y tenga una especie de guia de viaje, sitios turisticos, restaurantes sobre Ibarra(Ecuador)',
    features: ['Navegación multipantalla', 'Tarjetas y transiciones', 'Modo claro y oscuro', 'Lugares y restaurantes', 'Favoritos e itinerario'],
    note: 'La primera versión utiliza verde bosque y tonos cálidos. Puedes recorrer las pantallas, guardar lugares y editar tu itinerario.',
    shortTags: ['Guía de viaje', 'Claro / oscuro', 'Itinerario'],
  },
  {
    id: 'v02', number: '02', title: 'Ibarra en movimiento.', name: 'Más planes, más color',
    tone: 'vibrant', label: 'LA PRIMERA EVOLUCIÓN', path: './prototipos/v02/',
    summary: 'La guía gana espacios deportivos, una identidad más viva y una puerta de entrada al viaje.',
    prompt: 'modifica la web tambien con un apartado de lugares donde hacer deporte ya sea en equipo o no, coloca la bandera de ecuador en todas las paginas, utiliza colores mas llamativos y da la opcion de enviarte a una agencia de vuelos para comprar un billete direccion ibarra',
    features: ['Deporte individual y en equipo', 'Filtros por actividad', 'Bandera de Ecuador', 'Azul, amarillo y coral', 'Enlaces para buscar vuelos'],
    note: 'Esta versión conserva los enlaces de vuelos originales a Despegar y Skyscanner, con llegada a Quito y continuación por carretera a Ibarra.',
    shortTags: ['Deporte', 'Bandera de Ecuador', 'Vuelos'],
  },
];

export const excludedPrompt = {
  id: 'v03', number: '03', title: 'La última iteración.', name: 'Iberia y correo',
  prompt: 'Despegar no funciona bien, pon otra pagina(iberia) y pon una funcion de poder enviar el itinerario hecho en la web a cualquier correo electronico',
  summary: 'Sustitución de Despegar por Iberia y una opción para preparar el itinerario en un correo.',
};
export const allPrompts = [...versions, excludedPrompt];
