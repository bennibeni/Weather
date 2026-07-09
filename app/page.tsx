"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CITIES_BY_STATE } from "../lib/cities";

export default function Home() {
  const [state, setState] = useState("ME");
  const [alertsText, setAlertsText] = useState<string | null>(null);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  const cities = CITIES_BY_STATE[state] ?? [];
  const [cityIndex, setCityIndex] = useState(0);
  const [customLat, setCustomLat] = useState("");
  const [customLon, setCustomLon] = useState("");
  const [forecastText, setForecastText] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);

  // Reset the selected city whenever the state changes.
  useEffect(() => {
    setCityIndex(0);
  }, [state]);

  async function handleAlerts(e: FormEvent<HTMLFormElement>) {
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

  async function handleForecast(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const selected = cityIndex >= 0 ? cities[cityIndex] : undefined;
    const lat = selected ? selected.lat : Number(customLat);
    const lon = selected ? selected.lon : Number(customLon);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      setForecastError("Enter valid coordinates.");
      return;
    }

    setForecastLoading(true);
    setForecastError(null);
    setForecastText(null);
    try {
      const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);
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
        <h2>Forecast for {state || "your state"}</h2>
        <form onSubmit={handleForecast} className="form-row">
          <select
            value={cityIndex}
            onChange={(e) => setCityIndex(Number(e.target.value))}
            aria-label="City"
          >
            {cities.map((city, i) => (
              <option key={city.name} value={i}>
                {city.name}
              </option>
            ))}
            <option value={-1}>Custom coordinates…</option>
          </select>

          {cityIndex === -1 && (
            <>
              <input
                value={customLat}
                onChange={(e) => setCustomLat(e.target.value)}
                placeholder="Latitude"
                aria-label="Latitude"
              />
              <input
                value={customLon}
                onChange={(e) => setCustomLon(e.target.value)}
                placeholder="Longitude"
                aria-label="Longitude"
              />
            </>
          )}

          <button type="submit" disabled={forecastLoading}>
            {forecastLoading ? "Loading…" : "Get forecast"}
          </button>
        </form>
        {forecastError && <p className="error">{forecastError}</p>}
        {forecastText && <pre className="result">{forecastText}</pre>}
      </section>

      <nav className="links">
        <a href="https://links-page-bennibeni.vercel.app/" target="_blank" rel="noreferrer">&larr; All projects</a>
      </nav>
    </main>
  );
}
