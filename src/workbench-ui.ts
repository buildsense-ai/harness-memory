import { readFileSync } from "node:fs";

export const WORKBENCH_HTML = readFileSync("public/workbench/index.html", "utf8");
export const WORKBENCH_CSS = readFileSync("public/workbench/workbench.css", "utf8");
export const WORKBENCH_JS = readFileSync("public/workbench/workbench.js", "utf8");
