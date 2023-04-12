import { serve } from "server";
import { corsHeaders } from "../_shared/cors.ts";

console.log(`Function "sbhs" up and running!`);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const data = {
    message: `Hello World!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
