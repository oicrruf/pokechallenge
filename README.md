# @PokeChallenge

Hecha por: Víctor Manuel Reyes Alvarenga

## Features

- Login y registo por medio de correo electrónico en Firebase
- Fuente personalizada
- Selección de Regiones > Locaciones > Áreas > Pokemon
- Creación de grupos de pokémons basados en una región
- Listado de todos los grupos de pokémons creados
- Eliminación de grupos creados
- Clonación de grupos por medio de código encriptado

## Installation

Clona el proyecto con GIT desde:
https://github.com/oicrruf/pokechallenge

Posteriormente ejecuta los siguientes comandos:

```sh
cd pokechallenge
npm i
npx react-native run-android
```

Esta aplicación ha sido diseñada y probada en entornos Windows y Android

## Instructions

- Para crear un grupo, el usuario debe navegar entre Region > Location > Area y seleccionar los pokemon disponibles, que pueden ser desde 3 y hasta 6 pokemons
- Para clonar un grupo deberá darse click en la opción de compartir del grupo a clonar, esto enviará al portapapeles del dispositivo un código cifrado el cual deberá ser compartido he ingresado en la pantalla de clonación de grupos

## Roadmap

- Refactoización del código
- Crear componente de modal para que pueda ser reutilizado
- Separar componentes por tipo de pantalla en archivos diferentes
- Extreaer funciones de persistencia y consulta en firebase
- Validar formulario de "clonación" de grupos
- Agregar opción de editar grupos
- Mejorar diseño Drawer menú

## Disclaimer

Se ha identificado un problema con la instalación de paquetes haciendo uso de yarn

## License

MIT
