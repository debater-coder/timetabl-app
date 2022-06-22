export default function handler(request, response) {
  let name = request.query.name || "user";
  response.status(200).send(`Hello, ${name}!`);
}
