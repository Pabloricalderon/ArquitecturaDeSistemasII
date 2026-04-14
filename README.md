# API GraphQL - Cursos y Estudiantes


## Endpoint público
https://tarea-graphql.onrender.com/

Documentación de los modelos disponibles
Modelo: Curso

Este modelo representa la información general de los cursos registrados en la base de datos.
| Campo         | Tipo             | Descripción                                |
| ------------- | ---------------- | ------------------------------------------ |
| `id`          | `ID!`            | Identificador único del curso              |
| `nombre`      | `String!`        | Nombre del curso                           |
| `codigo`      | `String!`        | Código asignado al curso                   |
| `creditos`    | `Int!`           | Número de créditos del curso               |
| `docente`     | `String!`        | Nombre del docente encargado               |
| `jornada`     | `String!`        | Jornada en la que se imparte               |
| `estudiantes` | `[Estudiante!]!` | Lista de estudiantes inscritos en el curso |

Modelo: Estudiante

Este modelo representa la información de los estudiantes almacenados en la base de datos.
| Campo      | Tipo      | Descripción                          |
| ---------- | --------- | ------------------------------------ |
| `id`       | `ID!`     | Identificador único del estudiante   |
| `nombre`   | `String!` | Nombre completo del estudiante       |
| `carnet`   | `String!` | Número de carnet del estudiante      |
| `email`    | `String!` | Correo electrónico                   |
| `carrera`  | `String!` | Carrera a la que pertenece           |
| `edad`     | `Int!`    | Edad del estudiante                  |
| `curso_id` | `Int`     | Identificador del curso asociado     |
| `curso`    | `Curso`   | Curso al que pertenece el estudiante |

Relación entre modelos

La relación entre los modelos permite consultar información conectada entre ambos:

Un curso puede devolver la lista de estudiantes inscritos.
Un estudiante puede devolver la información del curso al que pertenece.

Esta estructura demuestra una de las principales ventajas de GraphQL: consultar datos relacionados en una sola petición.

Consultas disponibles
| Consulta                            | Descripción                                   |
| ----------------------------------- | --------------------------------------------- |
| `cursos`                            | Devuelve todos los cursos registrados         |
| `curso(id: ID!)`                    | Devuelve un curso específico por su ID        |
| `estudiantes`                       | Devuelve todos los estudiantes registrados    |
| `estudiante(id: ID!)`               | Devuelve un estudiante específico por su ID   |
| `estudiantesPorCurso(cursoId: ID!)` | Devuelve los estudiantes asociados a un curso |

Tecnologías utilizadas
Node.js
GraphQL
Apollo Server
SQLite
Render