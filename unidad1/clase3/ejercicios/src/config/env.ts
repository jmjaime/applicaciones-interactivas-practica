import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 3000),
};