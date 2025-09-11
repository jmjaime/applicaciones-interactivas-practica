import { createApp } from "./app";

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = createApp();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API escuchando en http://localhost:${PORT}`);
});
