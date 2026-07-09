export const metadata = {
  title: "Weather MCP Server",
  description: "MCP server exposing US weather alerts and forecasts (National Weather Service) over Streamable HTTP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
