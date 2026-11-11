import { createPool } from "./db/pool.js";
import { migrate } from "./db/migrate.js";
import { createProject, createProjectKey } from "./db/projects.js";
const pool = createPool();
try {
  await migrate(pool);
  const [cmd, name] = process.argv.slice(2);
  if (cmd === "project-create" && name)
    console.log(JSON.stringify(await createProject(pool, name)));
  else if (cmd === "project-key-create" && name)
    console.log(JSON.stringify(await createProjectKey(pool, name)));
  else if (cmd !== "migrate")
    throw Error("usage: admin migrate | project-create NAME | project-key-create PROJECT_ID");
} finally {
  await pool.end();
}
