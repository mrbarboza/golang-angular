export const environment = {
  production: false,
  gateway: "http://localhost:3000",
  callback: "http://localhost:4200/callback",
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  audience: process.env.AUTH0_API_IDENTIFIER
};
