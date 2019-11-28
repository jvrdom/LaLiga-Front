# La Liga Test Frontend

### Demo online: https://jvrdom.github.io/LaLiga-Front/

## Setup

Instalación de dependencias

`> npm install`

Trabajar en modo desarrollo

`> npm run start:dev`

Generación de assets para deployar

`> npm run build`

Este sitio es accesible mediante github pages, así que luego de aplicar los cambios, ejecutar `npm run build` para generar los assets y pushearlo al repositorio para su pronta actualización.

## Tech List

- [ESLint](https://eslint.org/)
- [ESLint Airbnb Style Guide](https://github.com/airbnb/javascript)
- [Firebase](https://firebase.google.com/)
- [Github Pages](https://pages.github.com/)
- [React](https://es.reactjs.org/)
- [React-Admin](https://marmelab.com/react-admin/)
- [React-SVG-Loader](https://github.com/boopathi/react-svg-loader)
- [SASS](https://sass-lang.com/)
- [Webpack](https://webpack.js.org/)

## Cosas a tener en cuenta

- Ya que facebook en su configuración de la aplicación necesita que se le establezca un dominio, se ha configurado el de la demo online, por lo cuál en caso de realizar pruebas de forma local, a menos que se cambie el dominio por el local no andaría.

- Se ha creado un `dataprovider` para el manejo de los datos. Esto se debe a que en ciertos casos o la forma en la que responde la API no es compatible con la librería `react-admin`. Este nuevo dataprovider mantiene el listado de todos los usuarios y las operaciones de Creación, Actualización y Borrado las aplica sobre el listado previamente obtenido.
