#!/usr/bin/env node

const Vite = require("vite");
const path = require("path");
const fs = require("fs-extra");
const configs = require("./viteConfigs");

const Cwd = (...args) => path.resolve(process.cwd(), ...args);
const isProd = process.env.NODE_ENV === "production";

const define = {
  "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`,
};

const requireTs = async (entry = "") => {
  await Vite.build(configs.tmp(entry));
  return require(Cwd("dist/tmp_ts", path.parse(Cwd(entry)).name));
};

async function build() {
  if (!isProd) {
    await Vite.build(configs.server(define));
    require(Cwd("dist/server-dev/serve.js"));
  } else {
    await Vite.build(configs.static(define));
    const { ssg } = await requireTs("scripts/prerender.ts");
    await ssg();

    setTimeout(() => {
      fs.removeSync("dist/tmp_ts");
    });
  }
}

build();
