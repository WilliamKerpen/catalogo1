import * as SQLite from "expo-sqlite";

export async function initDB(db: SQLite.SQLiteDatabase) {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE,
      senha TEXT,
      foto TEXT
    );
  `);

  console.log("Banco inicializado via SQLiteProvider");
}
