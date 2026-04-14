import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDb() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS cursos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      codigo TEXT NOT NULL UNIQUE,
      creditos INTEGER NOT NULL,
      docente TEXT NOT NULL,
      jornada TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS estudiantes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      carnet TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      carrera TEXT NOT NULL,
      edad INTEGER NOT NULL,
      curso_id INTEGER,
      FOREIGN KEY (curso_id) REFERENCES cursos(id)
    );
  `);

  const totalCursos = await db.get(`SELECT COUNT(*) AS total FROM cursos`);
  const totalEstudiantes = await db.get(`SELECT COUNT(*) AS total FROM estudiantes`);

  if (totalCursos.total === 0) {
    await db.run(`
      INSERT INTO cursos (nombre, codigo, creditos, docente, jornada)
      VALUES
      ('Base de Datos I', 'BD101', 5, 'Ing. Morales', 'Matutina'),
      ('Programacion Web', 'PW202', 4, 'Ing. Lopez', 'Vespertina');
    `);
  }

  if (totalEstudiantes.total === 0) {
    await db.run(`
      INSERT INTO estudiantes (nombre, carnet, email, carrera, edad, curso_id)
      VALUES
      ('Ana Perez', '2026001', 'ana@correo.com', 'Ingenieria en Sistemas', 20, 1),
      ('Luis Gomez', '2026002', 'luis@correo.com', 'Ingenieria en Sistemas', 22, 1),
      ('Maria Lopez', '2026003', 'maria@correo.com', 'Ingenieria Industrial', 21, 2),
      ('Carlos Diaz', '2026004', 'carlos@correo.com', 'Ingenieria en Sistemas', 23, 2);
    `);
  }

  return db;
}