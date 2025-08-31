import { createApp } from "./app";
import { env } from "./config/env";

function bootstrap() {
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`API listening on :${env.port}`);
  });
}

bootstrap();