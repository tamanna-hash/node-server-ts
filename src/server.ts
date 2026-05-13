import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
  
    routeHandler(req,res)

    // console.log(req);
  },
);

server.listen(5000, () => {
  console.log("whatssapp....running on port 5000");
});
