import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { getAlertsText, getForecastText } from "../../lib/nws";

function textResponse(text: string) {
  return {
    content: [{ type: "text" as const, text }],
  };
}

function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return textResponse(`Weather service error: ${message}`);
}

// Streamable HTTP MCP server (SSE disabled — no Redis attached)
const handler = createMcpHandler(
  async (server) => {
    server.registerTool(
      "get-alerts",
      {
        title: "Get Weather Alerts",
        description: "Get active weather alerts for a US state or territory using a two-letter code.",
        inputSchema: {
          state: z.string().length(2).describe("Two-letter US state or territory code, for example CA or NY."),
        },
      },
      async ({ state }) => {
        try {
          return textResponse(await getAlertsText(state));
        } catch (error) {
          return errorResponse(error);
        }
      },
    );

    server.registerTool(
      "get-forecast",
      {
        title: "Get Weather Forecast",
        description: "Get a National Weather Service forecast for latitude/longitude coordinates in the United States.",
        inputSchema: {
          latitude: z.number().min(-90).max(90).describe("Latitude of the location."),
          longitude: z.number().min(-180).max(180).describe("Longitude of the location."),
        },
      },
      async ({ latitude, longitude }) => {
        try {
          return textResponse(await getForecastText(latitude, longitude));
        } catch (error) {
          return errorResponse(error);
        }
      },
    );
  },
  {},
  {
    basePath: "",
    verboseLogs: true,
    maxDuration: 60,
    disableSse: true,
  },
);

export { handler as GET, handler as POST, handler as DELETE };
