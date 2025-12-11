import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(__dirname, "ma-base.db");

const db = new Database(dbPath);

// Création de la table
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo TEXT,
    password TEXT
  )
`).run();

// Pré-remplir la base avec l'utilisateur root si il n'existe pas déjà
const rootExists = db.prepare("SELECT * FROM users WHERE pseudo = ?").get("root");

if (!rootExists) {
  db.prepare("INSERT INTO users (pseudo, password) VALUES (?, ?)").run("root", "root");
  console.log("Utilisateur root créé !");
} else {
  console.log("Utilisateur root déjà existant.");
}

export default db;