import fs from "fs";
import type { IncomingMessage, ServerResponse } from "http";
import path from "path";

const filePath = path.join(process.cwd(), "./src/database/products.json");

export const readProduct = (req: IncomingMessage, res: ServerResponse) => {
  const products = fs.readFileSync(filePath, "utf-8");
  // console.log(products);
  return JSON.parse(products);
};

export const insertProduct = (payload: any) => {
  fs.writeFileSync(filePath, JSON.stringify(payload));
};
