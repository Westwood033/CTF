import path from "path";
import fs from "fs";
import { app } from "electron";
import crypto from "crypto";

const filePath = path.join(app.getPath("userData"), "flag.txt");

const key = "477871debfaf984006499a90a19a27b9c74ef3354db7b0c4f2c1834fa834c6eb95ba0d67e3c0bc68970ba9cda9986b8d2c314cbb10fc93c363d5d71ea646bdf54790d3a283550d5e07fa450859bf16a33542db48cb734f571c4e111d65a95fc7";

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
