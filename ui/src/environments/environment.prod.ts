import dotenv from "dotenv";

const config = dotenv.config();

export const environment = {
  production: true,
  gateway: "",
  callback: "http://localhost:4200/callback",
  domain: "https://" + process.env.AUTH0_DOMAIN + "/",
  clientId: process.env.AUTH0_CLIENTID,
  audience: process.env.AUTH0_API_IDENTIFIER
};
