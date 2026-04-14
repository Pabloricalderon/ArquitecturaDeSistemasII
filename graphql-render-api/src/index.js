import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { initDb } from "./db.js";

const db = await initDb();

const typeDefs = `#graphql
  type Curso {
    id: ID!
    nombre: String!
    codigo: String!
    creditos: Int!
    docente: String!
    jornada: String!
    estudiantes: [Estudiante!]!
  }

  type Estudiante {
    id: ID!
    nombre: String!
    carnet: String!
    email: String!
    carrera: String!
    edad: Int!
    curso_id: Int
    curso: Curso
  }

  type Query {
    cursos: [Curso!]!
    curso(id: ID!): Curso
    estudiantes: [Estudiante!]!
    estudiante(id: ID!): Estudiante
    estudiantesPorCurso(cursoId: ID!): [Estudiante!]!
  }
`;

const resolvers = {
  Query: {
    cursos: async (_, __, { db }) => {
      return db.all(`SELECT * FROM cursos`);
    },
    curso: async (_, { id }, { db }) => {
      return db.get(`SELECT * FROM cursos WHERE id = ?`, [id]);
    },
    estudiantes: async (_, __, { db }) => {
      return db.all(`SELECT * FROM estudiantes`);
    },
    estudiante: async (_, { id }, { db }) => {
      return db.get(`SELECT * FROM estudiantes WHERE id = ?`, [id]);
    },
    estudiantesPorCurso: async (_, { cursoId }, { db }) => {
      return db.all(`SELECT * FROM estudiantes WHERE curso_id = ?`, [cursoId]);
    }
  },

  Curso: {
    estudiantes: async (parent, _, { db }) => {
      return db.all(`SELECT * FROM estudiantes WHERE curso_id = ?`, [parent.id]);
    }
  },

  Estudiante: {
    curso: async (parent, _, { db }) => {
      if (!parent.curso_id) return null;
      return db.get(`SELECT * FROM cursos WHERE id = ?`, [parent.curso_id]);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

const PORT = Number(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async () => ({ db })
});

console.log(`Servidor GraphQL corriendo en: ${url}`);