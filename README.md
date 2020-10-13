# World Kart Championship

Web para la prueba de front-end.

Tecnologías utilizadas: React, Typescript, Webpack, Node, Jest

Para desarrollo utilizar el comando:

```
npm run dev
```

Para lanzar el build de producción:
```
npm run build
```

Lanzar los tests:
```
npm run test
```


#### Descripción

Bienvenido a DevAway Racing Services.

Uno de nuestros clientes ha decidido implementar un sistema para poder ver la clasificación de los pilotos en el World Kart Championship que realiza en su circuito.

Lo que necesita es una página web donde pueda verse la clasificación global de todos los pilotos que han participado en las 10 carreras de las que se compone este campeonato.

También necesitaría una pantalla individual de los pilotos donde saliera su información y todos sus tiempos y posiciones en las diferentes carreras. Y que estas fueran rotando
automáticamente entre la clasificación general, la clasificación de cada cada carrera y los tiempos en cada carrera de los pilotos.

Para empezar con el proyecto nos ha dado toda la información en un JSON que genera su sistema de timing en el circuito.

```javascript
[
  {
      _id: 'ID DEL CHIP DE TIMING',
      picture: 'FOTOGRAFÍA DEL PARTICIPANTE',
      age: 'EDAD DEL PARTICIPANTE',
      name: 'NOMBRE DEL PILOTO',
      team: 'EQUIPO DEL PARTICIPANTE',
      races: [
        {
            name: 'NOMBRE DE LA CARRERA',
            time: 'TIEMPO EN LA CARRERA'
        }
      ]
    }
  }
]
```