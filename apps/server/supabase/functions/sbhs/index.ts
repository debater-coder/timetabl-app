import { serve } from "server";
import { corsHeaders } from "../_shared/cors.ts";
import { z } from "zod";

console.log(`Function "sbhs" up and running!`);

const apiVersion = "1.0.0";

const requestPayloadSchema = z.discriminatedUnion("action", [
  z.object({
    action: z.literal("version"),
  }),
]);

serve(async (req) => {
  // Handle cors preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Validate payload
  let payload;
  try {
    payload = requestPayloadSchema.parse(await req.json());
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Handle request
  switch (payload.action) {
    case "version": {
      return new Response(JSON.stringify(apiVersion), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }
});
