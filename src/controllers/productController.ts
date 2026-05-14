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
    if (!id) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
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
    // console.log(newProduct);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    // Post product
    const body = await parseBody(req);
    const products = readProduct(req, res);

    const index = products.findIndex((p: IProducts) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    products[index] = { id: products[index].id, ...body };
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product updated successfully",
        data: products[index],
      }),
    );
  } else if (method === "DELETE" && id !== null) {
    // Post product
    const body = await parseBody(req);
    const products = readProduct(req, res);

    const index = products.findIndex((p: IProducts) => p.id === id);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          data: null,
        }),
      );
    }
    products.splice(index, 1);
    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product deleted successfully",
        data: null,
      }),
    );
  }
};
