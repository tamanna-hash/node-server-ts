import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../services/product.service";
import type { IProducts } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  // console.log(urlParts); [ '', 'products', '100' ]
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  if (url === "/products" && method === "GET") {
    // get all products
    const products = readProduct(req, res);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "here are products", data: products }));
  } else if (method === "GET" && id !== null) {
    // get single product
    const products = readProduct(req, res);
    const product = products.find((p: IProducts) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    // Post product
    const products = readProduct(req, res);
    const body = await parseBody(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    console.log(newProduct);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data:newProduct
      }),
    );
  }
};
