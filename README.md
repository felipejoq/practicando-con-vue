# Aprendiendo Vue.js

- 01 - [Introducción a Vue.js](01-vue-first-step)
Repasa las bases de vue con código para conocer sentencias de control,
ciclos, eventos, propiedades computadas, propiedades reactivas, directivas y

- 02 - [Single File Components](02-single-file-component)
Se aprende a crear componentes de una sola instancia, se aprende a usar
`template`, `script` y `style` en un solo archivo `.vue`.

- 03 - [Chat Indecision](03-chat-indecision)
Se crea un chat con Vue.js, se aprende a usar `v-model`, `v-on`, `v-for`, `v-if`,
además se hace fetching de datos a una Api llamada `yesno.wtf` para obtener
una respuesta yes, no o maybe y así cuando alguien haga preguntas ? en el chat
se solicita una respuesta a la API.

- 03.1 [Chat Indecision - Tests unitarios](03-chat-indecision)
Se agregan test unitarios para el chat indecision, se agrega vitest, su configuración y se hacen pruebas unitarias para el componente.
además se usan herramientas para controlar ciclos de vida de los componentes de vue con Vue Test Utils.

-> Uso de mount, unmount, globals, mocks, stubs, emit, props, etc. Para pruebas unitarias.
-> Uso de spy o funciones mock para simular comportamientos de funciones.