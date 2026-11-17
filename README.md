# PrototiposGuiaDeViajes

## Ibarra Viva · Del prompt al prototipo

Galería interactiva con los **tres prompts de diseño originales** y los **dos primeros prototipos navegables** de Ibarra Viva. El último prototipo se excluye y se conserva su prompt. No aparecen en la galería los prompts de subida al repositorio ni de Pages.

### Qué puedes hacer

- Leer el prompt junto a su prototipo utilizable.
- Abrir cada prototipo por separado y navegar sus pantallas.
- Comparar las dos versiones en paralelo.
- Probar vistas adaptables, de tableta y de móvil.
- Cambiar el tema, guardar favoritos y editar itinerarios dentro de cada versión.
- Reiniciar cada prototipo de forma independiente.
- Copiar o descargar los prompts originales.

### GitHub Pages

El sitio está preparado para publicarse desde **main → /(root)**. El archivo de entrada es `index.html`; no requiere compilación ni dependencias. `.nojekyll` permite servir directamente todos los archivos estáticos.

### Abrir en local

Desde la raíz del repositorio:

```bash
python3 -m http.server 5173
```

Abre **http://localhost:5173**. Los módulos JavaScript necesitan HTTP, por lo que no se debe abrir `index.html` directamente como archivo.

### Estructura

- `index.html`, `gallery.js`, `gallery.css`: la galería y sus interacciones.
- `prompts.js`: textos de los tres prompts de diseño.
- `prototipos/v01/`: primera versión completa de la guía de Ibarra.
- `prototipos/v02/`: segunda versión, con deportes, bandera y vuelos.
- `provenance.json`: commits originales de los que se recuperaron los prototipos.

Las claves de almacenamiento local de cada prototipo están separadas para que sus preferencias, favoritos e itinerarios no se mezclen. Las fotografías y las fuentes mantienen sus créditos dentro de cada prototipo.
