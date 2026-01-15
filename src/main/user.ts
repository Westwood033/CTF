import db from "./db";
import User from "./../global"

export function createUser(pseudo: string, password: string): User {
  const stmt = db.prepare(`
    INSERT INTO users (pseudo, password)
    VALUES (?, ?)
  `);

  const result = stmt.run(pseudo, password);

  return {
    id: Number(result.lastInsertRowid),
    pseudo,
    password
  };
}

export function getUserByPseudoAndPassword(pseudo: string, password: string): User | undefined {
  if(pseudo && password){
    const stmt = db.prepare(`SELECT * FROM users WHERE pseudo = '${pseudo}' and password = '${password}'`); // utiliser stmin.get(pseudo, password) jection sql
    return stmt.get() as User | undefined;
  }
}

