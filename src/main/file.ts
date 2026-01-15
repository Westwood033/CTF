import path from "path";
import fs from "fs";
import { app } from "electron";
import crypto from "crypto";

const filePath = path.join(app.getPath("userData"), "flag.txt");

const key = "c1b8f3c4c2b5f7f7c5b9c99e4d2b0f2c4f4b7c07b3f4f0e5e1b8f4d95d6a0c21f4310e03cf6b1c98a1ebd2c0d7eeb2f8d0e13b64a7a9050d6162d4df509c689b4790d3a283550d5e07fa450859bf16a33542db48cb734f571c4e111d65a95fc7";

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, key, { encoding: "utf-8" });
}

export function verify(flag: string, id: number): boolean {

  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const storedHash = fs.readFileSync(filePath, "utf-8").replace(/\s+/g, "");
    const parts = storedHash.match(/.{1,64}/g);
    const idParts = parts && parts.length >= id ? parts[id-1] : null;

    if(idParts === null) return false;

    const hash = crypto.createHash("sha256").update(flag).digest("hex");
    return hash === idParts;
  } catch {
    return false;
  }
}
