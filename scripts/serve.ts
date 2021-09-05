/* eslint-disable @typescript-eslint/no-var-requires */
import { fastify } from "fastify";
import fs from "fs-extra";
import { parseURL } from "./parsers";
import { Cwd } from "./loaders";

const PORT = process.env.PORT || 3000;

async function start() {
  const app = fastify({});

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await app.register(require("middie"));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reactJsx = require("vite-react-jsx").default;
  const reactRefresh = require("@vitejs/plugin-react-refresh").default;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vite = await (require as any)("vite").createServer({
    root: process.cwd(),
    logLevel: "error",
    plugins: [reactRefresh(), reactJsx()],
    server: {
      middlewareMode: "ssr",
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  });

  const render = (await vite.ssrLoadModule("src/entry-server.tsx")).render;
  const baseHTML = fs.readFileSync(Cwd("index.html"), "utf-8");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (app as any).use(vite.middlewares);

  app.get("*", async (req, reply) => {
    try {
      const url = req.url;
      const parsededURL = parseURL(url);

      const template = await vite.transformIndexHtml(url, baseHTML);
      const context: { url?: string } = {};

      const appHtml = await render(parsededURL, context, {
        query: req.query,
        routerPath: req.routerPath,
      });

      const html = template.replace(`<!--app-html-->`, appHtml);
      reply.status(200).headers({ "Content-Type": "text/html" }).send(html);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);
      reply.status(500).send(e.stack);
    }
  });

  try {
    console.log(`http://localhost:${PORT}`);
    await app.listen(PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
start();
