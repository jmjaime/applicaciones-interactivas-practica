import { createApp } from "./app";
import { initializeDatabase } from "./db/data-source";

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

async function main() {
  await initializeDatabase("app");
  const app = createApp();
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
