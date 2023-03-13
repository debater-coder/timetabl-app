export default {
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: location.protocol + "//" + location.host + "/",
  authorization_endpoint: (window as unknown as { Cypress: boolean }).Cypress
    ? "http://localhost:3000/authorize.html"
    : "https://student.sbhs.net.au/api/authorize",
  scopes: "all-ro",
};
