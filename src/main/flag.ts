import db from "./db";
import Flag from "../global"


export function confirmFlag(number: number, flag: string): Flag {
  const stmt = db.prepare(`
    INSERT INTO flags (number, flag)
    VALUES (?, ?)
  `);

  const result = stmt.run(number, flag);

  return {
    id: Number(result.lastInsertRowid),
    number,
    flag,
  };
}

export function getFlagByNumber(number: number): Flag | undefined {
  const stmt = db.prepare(`
    SELECT * FROM flags WHERE number = ? LIMIT 1
  `);

  return stmt.get(number) as Flag | undefined
}