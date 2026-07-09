"use client";

import { useState, type FormEvent } from "react";

export default function Home() {
  const [state, setState] = useState("ME");
  const [alertsText, setAlertsText] = useState<string | null>(null);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  const [lat, setLat] = useState("44.3106");
  const [lon, setLon] = useState("-69.7795");
  const [forecastText, setForecastText] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);

  async function handleAlerts(e: FormEvent) {
    e.preventDefault();
    setAlertsLoading(true);
    setAlertsError(null);
    setAlertsText(null);
    try {
      const res = await fetch(`/api/alerts?state=${encodeURIComponent(state)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed.");
      setAlertsText(data.text);
    } catch (err) {
      setAlertsError(err instanceof Error ? err.message : String(err));
    } finally {
      setAlertsLoading(false);
    }
  }

  async function handleForecast(e: FormEvent) {
    e.preventDefault();
    setForecastLoading(true);
    setForecastError(null);
    setForecastText(null);
    try {
      const res = await fetch(`/api/forecast?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed.");
      setForecastText(data.text);
    } catch (err) {
      setForecastError(err instanceof Error ? err.message : String(err));
    } finally {
      setForecastLoading(false);
    }
  }

  return (
    <main className="shell">
      <p className="eyebrow">bennibenis-projects</p>
      <h1>US Weather</h1>
      <p className="lede">
        Check active weather alerts and 7-day forecasts for any US location, powered by
        the National Weather Service.
      </p>

      <section className="panel">
        <h2>Weather alerts</h2>
        <form onSubmit={handleAlerts} className="form-row">
          <input
            value={state}
            onChange={(e) => setState(e.target.value.toUpperCase())}
            maxLength={2}
            placeholder="State code, e.g. ME"
            aria-label="Two-letter state code"
          />
          <button type="submit" disabled={alertsLoading}>
            {alertsLoading ? "Loading…" : "Get alerts"}
          </button>
        </form>
        {alertsError && <p className="error">{alertsError}</p>}
        {alertsText && <pre className="result">{alertsText}</pre>}
      </section>

      <section className="panel">
        <h2>Forecast</h2>
        <form onSubmit={handleForecast} className="form-row">
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            aria-label="Latitude"
          />
          <input
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Longitude"
            aria-label="Longitude"
          />
          <button type="submit" disabled={forecastLoading}>
            {forecastLoading ? "Loading…" : "Get forecast"}
          </button>
        </form>
        {forecastError && <p className="error">{forecastError}</p>}
        {forecastText && <pre className="result">{forecastText}</pre>}
      </section>

      <section className="panel panel-dev">
        <h2>For MCP clients</h2>
        <p className="lede-small">
          This app is also an MCP (Model Context Protocol) server exposing the same two
          tools (<code>get-alerts</code>, <code>get-forecast</code>) over Streamable HTTP.
        </p>
        <pre>{`{
  "mcpServers": {
    "weather": {
      "url": "https://weather-five-eosin-13.vercel.app/mcp"
    }
  }
}`}</pre>
      </section>

      <nav className="links">
        <a href="https://github.com/bennibeni/Weather" target="_blank" rel="noreferrer">Source code</a>
        <a href="https://links-page-bennibeni.vercel.app/" target="_blank" rel="noreferrer">&larr; All projects</a>
      </nav>
    </main>
  );
}
