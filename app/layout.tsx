import "./globals.css";

export const metadata = {
  title: "Weather MCP Server",
  description: "Server MCP che espone allerte meteo e previsioni USA (National Weather Service) via Streamable HTTP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
