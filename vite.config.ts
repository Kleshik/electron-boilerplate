import { ConfigEnv, UserConfig } from "vite";
import { join } from "path";
import react from "@vitejs/plugin-react";

const srcRoot = join(__dirname, "src");
const publicRoot = join(__dirname, "public");

export default ({ command }: ConfigEnv): UserConfig => {
  if (command === "serve") {
    return {
      root: srcRoot,
      base: "/",
      publicDir: publicRoot,
      plugins: [react()],
      resolve: {
        alias: {
          "/@": srcRoot,
        },
      },
      build: {
        outDir: join(srcRoot, "/out"),
        emptyOutDir: true,
        rollupOptions: {},
      },
      server: {
        port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
      },
      optimizeDeps: {
        exclude: ["path"],
      },
    };
  }

  return {
    root: srcRoot,
    base: "./",
    publicDir: publicRoot,
    plugins: [react()],
    resolve: {
      alias: {
        "/@": srcRoot,
      },
    },
    build: {
      outDir: join(srcRoot, "/out"),
      emptyOutDir: true,
      rollupOptions: {},
    },
    server: {
      port: process.env.PORT === undefined ? 3000 : +process.env.PORT,
    },
    optimizeDeps: {
      exclude: ["path"],
    },
  };
};