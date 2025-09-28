// fileTree.js
import fs from "fs";
import path from "path";

// Función recursiva para generar el árbol
function generateTree(dirPath, prefix = "") {
  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const pointer = isLast ? "└─ " : "├─ ";
    const newPrefix = prefix + (isLast ? "   " : "│  ");
    const fullPath = path.join(dirPath, item.name);

    console.log(prefix + pointer + item.name);

    if (item.isDirectory()) {
      generateTree(fullPath, newPrefix);
    }
  });
}

// Carpeta base del proyecto (ejemplo: ./src)
const baseDir = path.resolve("./src");

console.log(path.basename(baseDir) + "/");
generateTree(baseDir);
