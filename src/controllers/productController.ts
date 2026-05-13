import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  if (url === "/products" && method === "GET") {
    const products = readProduct(req,res)
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "here are products", data:products }));
  }
};
