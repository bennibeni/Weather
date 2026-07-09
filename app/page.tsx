export default function Home() {
  return (
    <main className="shell">
      <p className="eyebrow">bennibenis-projects</p>
      <h1>Weather MCP Server</h1>
      <p className="lede">
        An MCP (Model Context Protocol) server exposing weather alerts and forecasts for
        the United States, backed by the National Weather Service. Runs as a serverless
        function on Vercel over the Streamable HTTP transport.
      </p>

      <div className="tools">
        <div className="tool">
          <span className="tool-name">get-alerts</span>
          <span className="tool-desc">Active weather alerts for a US state (two-letter code, e.g. CA, ME, NY).</span>
        </div>
        <div className="tool">
          <span className="tool-name">get-forecast</span>
          <span className="tool-desc">7-day forecast for latitude/longitude coordinates (US and territories only).</span>
        </div>
      </div>

      <pre>{`{
  "mcpServers": {
    "weather": {
      "url": "${"https://weather-five-eosin-13.vercel.app"}/mcp"
    }
  }
}`}</pre>

      <nav className="links">
        <a href="https://github.com/bennibeni/Weather" target="_blank" rel="noreferrer">Source code</a>
        <a href="https://links-page-bennibeni.vercel.app/" target="_blank" rel="noreferrer">&larr; All projects</a>
      </nav>
    </main>
  );
}
