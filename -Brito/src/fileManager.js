import fs from "fs";
import path from "path";

export const readFileSync = (file) => {
    const filePath = path.resolve("data", file);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  };
  
export const writeFileSync = (file, data) => {
    const filePath = path.resolve("data", file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  };

