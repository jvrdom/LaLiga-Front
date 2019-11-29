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

## Solución planteada:

En el apartado de estilos se ha utilizado SASS con la metódologia [BEM](http://getbem.com/) para evitar el anidado de selectores y mantener la independencia de los componentes.

Se ha establecido la siguiente estructura:

- css/settings: variables, fuentes (si aplica).
- css/generic: estilos que afecten a todo el sitio.
- css/components: componentes propios del sitio (formulario de login)
- css/objects: clases para lo objetos utilizados en los componentes (buttons, inputs)

Para el login con redes sociales se optó por usar Firebase que provee una fácil integración para iniciar sesión con diferentes redes sociales.

En el apartado de datos, se ha creado un `dataprovider` nuevo y no usar los provistos por la librería `react-admin`. Se ha tomado esta camino ya que la API no mantiene estados de los cambios establecidos en la misma.

Por ejemplo, a la hora de realizar un `POST` para la creación de un usuario la API retorna el usuario creado pero no mantiene el usuario previamente creado, esto ocasiona un problema ya que `react-admin` para aplicar cualquier acción sobre el usuario realiza una petición a la API en busca del mismo.

Por lo cual se ha optado por realizar la llamada a la API para obtener el listado la primera vez y guardarlo en la memoria del browser para su posterior uso en la operaciones de creación, borrado y actualización.

## Observaciones

- Ya que facebook en su configuración de la aplicación necesita que se le establezca un dominio, se ha configurado el de la demo online, por lo cuál en caso de realizar pruebas de forma local, a menos que se cambie el dominio por el local no andaría.
