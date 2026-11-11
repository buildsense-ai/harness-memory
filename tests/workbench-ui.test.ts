import { expect, it } from "vitest";
import type { Pool } from "pg";
import { buildApp } from "../src/app.js";
import { WORKBENCH_JS } from "../src/workbench-ui.js";

it("serves the workbench shell and static assets without requiring a database connection", async () => {
  const app = await buildApp({ pool: {} as Pool });
  try {
    const page = await app.inject({ method: "GET", url: "/workbench" });
    expect(page.statusCode).toBe(200);
    expect(page.headers["content-type"]).toContain("text/html");
    expect(page.body).toContain("id=\"graph\"");
    expect(page.body).toContain("id=\"project-key\"");
    expect(page.body).toContain("id=\"memory-content\"");
    expect(page.body).toContain("id=\"source-content\"");
    expect((await app.inject({ method: "GET", url: "/workbench.css" })).headers["content-type"]).toContain("text/css");
    expect((await app.inject({ method: "GET", url: "/workbench-overrides.css" })).headers["content-type"]).toContain("text/css");
    expect((await app.inject({ method: "GET", url: "/workbench.js" })).headers["content-type"]).toContain("javascript");
  } finally {
    await app.close();
  }
});

it("keeps all data endpoints behind the project key", async () => {
  const app = await buildApp({ pool: {} as Pool });
  try {
    for (const url of [
      "/v1/workbench/streams",
      "/v1/workbench/runs",
      "/v1/workbench/runs/run_x/graph",
      "/v1/workbench/runs/run_x/events",
      "/v1/memories/mem_x",
    ]) {
      const response = await app.inject({ method: "GET", url });
      expect(response.statusCode, url).toBe(401);
    }
  } finally {
    await app.close();
  }
});

it("has browser-valid JavaScript syntax", () => {
  expect(() => new Function(WORKBENCH_JS)).not.toThrow();
  expect(WORKBENCH_JS).toContain('el("details", "tool-pair")');
  expect(WORKBENCH_JS).not.toContain("innerHTML");
});
