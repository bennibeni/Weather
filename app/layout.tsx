import "./globals.css";

export const metadata = {
  title: "US Weather",
  description: "Check US weather alerts and forecasts, powered by the National Weather Service. Also available as an MCP server.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
