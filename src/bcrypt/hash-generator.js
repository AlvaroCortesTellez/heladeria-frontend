// hash-generator.js
import bcrypt from "bcrypt";

const generarHash = async () => {
  const passwordPlano = process.argv[2]; // la contraseña la pasas como argumento
  const hash = await bcrypt.hash(passwordPlano, 10); // costo 10
  console.log(`Contraseña: ${passwordPlano}`);
  console.log(`Hash bcrypt: ${hash}`);
};

generarHash();
