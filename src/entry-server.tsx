import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import type { StaticRouterContext } from "react-router";
import { App } from "./App";
import { parsePages } from "../scripts/parsers";

const pages = import.meta.globEager("./pages/**/*.tsx");
const routeMap: Record<
  string,
  {
    path: string;
    routerPath: string;
    Component: React.FC;
  }
> = {};

const routes = parsePages(pages).map(({ path, key, routerPath }) => {
  routeMap[path] = {
    path,
    routerPath,
    Component: pages[key].default,
  };
  return routeMap[path];
});

export async function render(
  url: string,
  context: StaticRouterContext,
) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <App routes={routes} ssr />
    </StaticRouter>,
  );

  return appHtml;
}
