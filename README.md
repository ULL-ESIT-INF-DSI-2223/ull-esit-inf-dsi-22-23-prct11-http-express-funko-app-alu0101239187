# Práctica 11 - Creación de una aplicación Express para gestionar el registro de Funko Pops

## Daniel Jorge Acosta

### alu0101239187@ull.edu.es

## Índice

- [Introducción](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101239187/#introducción)
- [Práctica](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101239187/#práctica)
- [Ejercicio PE 103](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101239187/#ejercicio-pe-103)
- [Conclusión](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101239187/#conclusión)
- [Bibliografía](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101239187/#bibliografía)

## Introducción

Esta práctica consiste principalmente en un cambio en la implementación de la aplicación cliente-servidor de registro de Funko Pops desarrollada en la [práctica 10](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct10-fs-proc-sockets-funko-app-alu0101239187.git), conviertiendo su lado servidor en un servidor [Express](https://expressjs.com) y sustituyendo el lado cliente por herramientas de procesado de peticiones HTTP, como ThunderClient. El proyecto sigue la siguiente estructura de directorios:

- **dist**: Código JavaScript generado
- **docs**: Documentación del código
- **src**: Código fuente TypeScript
  - **ejercicio-pe103**: Ejercicio desarrollado durante la hora de prácticas
  - **practica**: Archivos pertenecientes a la aplicación de registro de Funkos
- **tests**: Tests del código fuente TypeScript

Durante el desarrollo del sistema, se han utilizado las siguientes herramientas:

- **ESLint** para la comprobación de errores
- **Prettier** para el formateo del código
- **TypeDoc** para la generación automática de documentación del código
- **Mocha** y **Chai** para el desarrollo dirigido por pruebas
- **C8** para la comprobación del cubrimiento del código fuente
- **GitHub Actions** para la integración continua del código ejecutado en **Node.js**, el envío de información de cubrimiento a **Coveralls** y la comprobación de calidad y seguridad del código fuente con **Sonar Cloud**

## Práctica

Como se mencionó anteriormente, se ha cambiado la implementación de la aplicación de registro de Funko Pops, por lo que se tratarán únicamente los cambios que se han realizado.

### Cliente

El lado cliente de la aplicación ha sido eliminado por completo, siendo sustituido por herramientas de procesado de peticiones HTTP.

### Servidor

El lado servidor ha cambiado enormemente. La gestión de ficheros se ha mantenido casi idéntica, introduciendo el patrón callback para devolver los resultados de las operaciones. Se han cambiado los tipos con los que trabaja el servidor, añadiendo un tipo que representa la estructura JSON de un Funko y simplificando el tipo de respuesta, al que se le ha eliminado el tipo de operación que se está realizando. Al cambiar el servidor de los sockets ofrecidos por `net` a Express, este ahora responde a peticiones HTTP mediante el uso de los métodos propios de este y no mediante listeners. El servidor reacciona distinto dependiendo del verbo utilizado para la petición al directorio `\funkos`:

- _get_: Mediante GET se accede a las operaciones de lectura y listado. Las consultas deben contener un usuario y si la petición incluye en la consulta un ID, se responderá con el Funko del usuario con dicho ID. En caso de que no se incluya un ID, se interpretará como una operación de listado y se responderá con todos los Funkos del usuario.
- _post_: Mediante POST se añade un nuevo Funko. El cuerpo de la petición contendrá el usuario al que añadir el Funko y los datos del Funko, ya que al utilizar POST no se envía datos mediante la URL. Para su funcionamiento, se tuvo que añadir la libería `body-parser`, ya que en caso contrario el contenido de la petición aparecía como `undefined`.
- _delete_: Mediante DELETE se elimina un Funko. El cuerpo de la petición contendrá el usuario del que eliminar el Funko y el ID del Funko, ya que al utilizar DELETE no se envía datos mediante la URL.
- _patch_: Mediante PATCH se actualiza un Funko. El cuerpo de la petición contendrá el usuario del que actualizar el Funko y los datos del Funko, ya que al utilizar PATCH no se envía datos mediante la URL.
- _all_: En caso de que la petición utilice un verbo no contemplado o intente acceder a otra ruta el servidor responderá con un código 404.

Además, el servidor responderá con distintos códigos de estado en cada caso:

- _404_: La petición es incorrecta.
- _400_: La petición no contiene los datos necesarios para realizar la operación requerida y se envía el mensaje de error.
- _500_: Ha ocurrido un error durante la ejecución de la operación requerida y se envía el mensaje de error.
- _200_: La operación requerida se ha ejecutado correctamente y se envía el resultado.

## Ejercicio PE 103

El ejercicio de la sesión de prácticas trata del desarrollo de un servidor Express en el que las peticiones contienen un comando que será ejecutado por este. El servidor recibe las peticiones GET al directorio `/execmd`, siendo el resto respondidas con el código de estado 404. Para el resto de peticiones se responde con distintos códigos de estado:

- _400_: La petición no contiene el comando a ejecutar.
- _500_: Ha ocurrido un error durante la ejecución del comando y se envía el mensaje de error.
- _200_: El comando se ha ejecutado correctamente y se envía el resultado.

## Conclusión

En esta práctica hemos creado un servidor que atiende a peticiones HTTP, acercándonos cada vez más a programas que pueden tener aplicaciones reales y, además, hemos aprendido ha realizar estas peticiones para que nuestras aplicaciones puedan trabajar con APIs públicas.

## Bibliografía

- [Desarrollo de Sistemas Informáticos - Práctica 11 - Creación de una aplicación Express para gestionar el registro de Funko Pops](https://ull-esit-inf-dsi-2223.github.io/prct11-http-express-funko-app/)
- [Desarrollo de Sistemas Informáticos - Node.js](https://ull-esit-inf-dsi-2223.github.io/nodejs-theory/)
- [Node.js request documentation](https://www.npmjs.com/package/request)
