import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Usage: node scripts/test-client.mjs [origin] [state] [lat] [lon]
// Example (Maine): node scripts/test-client.mjs http://localhost:3000 ME 44.3106 -69.7795
const origin = process.argv[2] || "http://localhost:3000";
const state = process.argv[3] || "ME";
const latitude = Number(process.argv[4] ?? 44.3106); // Augusta, ME
const longitude = Number(process.argv[5] ?? -69.7795);

async function main() {
  const transport = new StreamableHTTPClientTransport(new URL(`${origin}/mcp`));

  const client = new Client(
    { name: "weather-mcp-test-client", version: "1.0.0" },
    { capabilities: { prompts: {}, resources: {}, tools: {} } },
  );

  console.log("Connecting to", `${origin}/mcp`);
  await client.connect(transport);
  console.log("Connected.");

  const tools = await client.listTools();
  console.log("Tools:", tools.tools.map((t) => t.name).join(", "));

  const alerts = await client.callTool({
    name: "get-alerts",
    arguments: { state },
  });
  console.log(`\n--- get-alerts ${state} ---`);
  for (const item of alerts.content) {
    if (item.type === "text") console.log(item.text);
  }

  const forecast = await client.callTool({
    name: "get-forecast",
    arguments: { latitude, longitude },
  });
  console.log(`\n--- get-forecast ${latitude}, ${longitude} ---`);
  for (const item of forecast.content) {
    if (item.type === "text") console.log(item.text);
  }

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
