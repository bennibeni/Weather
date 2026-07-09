export default function Home() {
  return (
    <main className="shell">
      <p className="eyebrow">bennibenis-projects</p>
      <h1>Weather MCP Server</h1>
      <p className="lede">
        Server MCP (Model Context Protocol) che espone allerte meteo e previsioni per gli
        Stati Uniti, basato sui dati del National Weather Service. Gira come funzione
        serverless su Vercel con trasporto Streamable HTTP.
      </p>

      <div className="tools">
        <div className="tool">
          <span className="tool-name">get-alerts</span>
          <span className="tool-desc">Allerte meteo attive per uno stato USA (codice a 2 lettere, es. CA, ME, NY).</span>
        </div>
        <div className="tool">
          <span className="tool-name">get-forecast</span>
          <span className="tool-desc">Previsioni a 7 giorni per coordinate lat/lon (solo USA e territori).</span>
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
        <a href="https://github.com/bennibeni/Weather" target="_blank" rel="noreferrer">Codice sorgente</a>
        <a href="https://links-page-bennibeni.vercel.app/" target="_blank" rel="noreferrer">&larr; Tutti i progetti</a>
      </nav>
    </main>
  );
}
