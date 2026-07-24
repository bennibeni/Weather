"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CITIES_BY_STATE, type CityOption } from "../lib/cities";

type AskLocation = CityOption & { state: string };

type NwsForecastPeriod = {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
};

const EXTRA_LOCATIONS: AskLocation[] = [
  { state: "ME", name: "Bar Harbor", lat: 44.3876, lon: -68.2039 },
  { state: "ME", name: "Acadia National Park", lat: 44.3386, lon: -68.2733 },
  { state: "ME", name: "Camden", lat: 44.2098, lon: -69.0648 },
  { state: "ME", name: "Rockland", lat: 44.1037, lon: -69.1089 },
  { state: "ME", name: "Machias", lat: 44.7148, lon: -67.4652 },
];

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildLocations(): AskLocation[] {
  const known = Object.entries(CITIES_BY_STATE).flatMap(([stateCode, options]) =>
    options.map((city) => ({ ...city, state: stateCode })),
  );

  return [...EXTRA_LOCATIONS, ...known];
}

function findLocation(question: string, locations: AskLocation[]) {
  const normalizedQuestion = normalizeText(question);

  return locations.find((location) =>
    normalizedQuestion.includes(normalizeText(location.name)),
  );
}

function detectLanguage(question: string) {
  const normalizedQuestion = normalizeText(question);
  const germanWords = ["morgen", "heute", "lohnt", "sich", "rauszugehen", "draussen", "draußen", "gehen", "sollte", "wetter"];
  return germanWords.some((word) => normalizedQuestion.includes(normalizeText(word))) ? "de" : "en";
}

function getTargetPeriodName(question: string) {
  const normalizedQuestion = normalizeText(question);
  const isTomorrow = ["domani", "tomorrow", "morgen"].some((word) =>
    normalizedQuestion.includes(normalizeText(word)),
  );
  const offset = isTomorrow ? 1 : 0;
  const date = new Date();
  date.setDate(date.getDate() + offset);

  return {
    label: offset === 1 ? "tomorrow" : "today",
    germanLabel: offset === 1 ? "morgen" : "heute",
    name: WEEKDAYS[date.getDay()],
  };
}

function pickForecastPeriod(forecastText: string, periodName: string) {
  const periods = forecastText.split("\n---\n");
  const exact = periods.find((period) => period.startsWith(`${periodName}:`));
  if (exact) return exact;

  const partial = periods.find((period) => period.startsWith(periodName));
  return partial ?? periods[0] ?? "";
}

async function readJsonResponse<T>(response: Response, label: string): Promise<T> {
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${label} HTTP ${response.status}: ${text.slice(0, 120)}`);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`${label} did not return JSON. It returned: ${text.slice(0, 80)}`);
  }
}

function formatForecastPeriod(period: NwsForecastPeriod) {
  const temperature =
    period.temperature === undefined
      ? "Unknown"
      : `${period.temperature}F`;

  return [
    `${period.name ?? "Unknown"}:`,
    `Temperature: ${temperature}`,
    `Wind: ${period.windSpeed ?? "Unknown"} ${period.windDirection ?? ""}`.trim(),
    period.shortForecast ?? "No forecast available",
  ].join("\n");
}

async function getDirectForecastPeriod(location: AskLocation, periodName: string) {
  const pointsResponse = await fetch(
    `https://api.weather.gov/points/${location.lat.toFixed(4)},${location.lon.toFixed(4)}`,
    { headers: { Accept: "application/geo+json, application/json" } },
  );
  const points = await readJsonResponse<{ properties?: { forecast?: string } }>(
    pointsResponse,
    "NWS points",
  );
  const forecastUrl = points.properties?.forecast;

  if (!forecastUrl) {
    throw new Error("NWS did not return a forecast URL for this location.");
  }

  const forecastResponse = await fetch(forecastUrl, {
    headers: { Accept: "application/geo+json, application/json" },
  });
  const forecast = await readJsonResponse<{ properties?: { periods?: NwsForecastPeriod[] } }>(
    forecastResponse,
    "NWS forecast",
  );
  const periods = forecast.properties?.periods ?? [];
  const match = periods.find((period) => period.name === periodName)
    ?? periods.find((period) => period.name?.startsWith(periodName))
    ?? periods[0];

  if (!match) {
    throw new Error("NWS did not return forecast periods for this location.");
  }

  return formatForecastPeriod(match);
}

function parseTemperature(period: string) {
  const match = period.match(/Temperature:\s*(-?\d+)/i);
  return match ? Number(match[1]) : null;
}

function parseMaxWind(period: string) {
  const numbers = period.match(/\d+/g)?.map(Number) ?? [];
  return numbers.length ? Math.max(...numbers) : null;
}

function makeOutdoorAdvice(
  location: AskLocation,
  period: string,
  targetLabel: string,
  language: "de" | "en",
) {
  const lower = period.toLowerCase();
  const temperature = parseTemperature(period);
  const maxWind = parseMaxWind(period);
  const severe = ["thunderstorm", "snow", "sleet", "freezing", "ice"];
  const wet = ["rain", "showers", "drizzle"];
  const poorVisibility = ["fog", "smoke", "haze"];
  const reasons: string[] = [];

  if (severe.some((word) => lower.includes(word))) reasons.push(language === "de" ? "mogliches Unwetter" : "possible severe weather");
  if (wet.some((word) => lower.includes(word))) reasons.push(language === "de" ? "Regen oder Schauer in der Vorhersage" : "rain or showers in the forecast");
  if (poorVisibility.some((word) => lower.includes(word))) reasons.push(language === "de" ? "eingeschrankte Sicht" : "reduced visibility");
  if (maxWind !== null && maxWind >= 25) reasons.push(language === "de" ? `Wind bis etwa ${maxWind} mph` : `wind up to about ${maxWind} mph`);
  if (temperature !== null && temperature < 35) reasons.push(language === "de" ? `kalte Temperaturen um ${temperature}F` : `cold temperatures around ${temperature}F`);
  if (temperature !== null && temperature > 90) reasons.push(language === "de" ? `heisse Temperaturen um ${temperature}F` : `hot temperatures around ${temperature}F`);

  const good = reasons.length === 0;

  if (language === "de") {
    const headline = good
      ? `Ja, ${targetLabel} sieht es gut aus, in ${location.name} rauszugehen.`
      : `Ich ware ${targetLabel} in ${location.name} vorsichtig mit dem Rausgehen.`;
    const reasonText = good
      ? "Die Vorhersage zeigt keinen offensichtlichen Regen, kein Unwetter, keinen starken Wind und keine extremen Temperaturen."
      : `Hauptgrund: ${reasons.join(", ")}.`;

    return `${headline}\n\n${reasonText}\n\n${period}`;
  }

  const headline = good
    ? `Yes, ${targetLabel} looks reasonable for going out in ${location.name}.`
    : `I would be cautious about going out in ${location.name} ${targetLabel}.`;
  const reasonText = good
    ? "The forecast does not show obvious rain, severe weather, strong wind, or extreme temperatures."
    : `Main reason: ${reasons.join(", ")}.`;

  return `${headline}\n\n${reasonText}\n\n${period}`;
}

export default function Home() {
  const [state, setState] = useState("ME");
  const [alertsText, setAlertsText] = useState<string | null>(null);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  const cities = CITIES_BY_STATE[state] ?? [];
  const askLocations = useMemo(buildLocations, []);
  const [cityIndex, setCityIndex] = useState(-1);
  const [customLat, setCustomLat] = useState("44.61");
  const [customLon, setCustomLon] = useState("-67.51");
  const [forecastText, setForecastText] = useState<string | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const [question, setQuestion] = useState("Lohnt es sich morgen in Machias rauszugehen?");
  const [answerText, setAnswerText] = useState<string | null>(null);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);

  // Reset the selected city whenever the state changes, but keep the initial custom coordinates on load.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setCityIndex(0);
  }, [state]);

  async function handleWeatherQuestion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const location = findLocation(question, askLocations);
    if (!location) {
      setAnswerError("I could not find that city. Try a known US city, for example Bar Harbor, Portland, Bangor, Boston, or New York City.");
      setAnswerText(null);
      return;
    }

    const target = getTargetPeriodName(question);
    const language = detectLanguage(question);

    setAnswerLoading(true);
    setAnswerError(null);
    setAnswerText(null);
    try {
      const period = await getDirectForecastPeriod(location, target.name);
      setAnswerText(makeOutdoorAdvice(location, period, language === "de" ? target.germanLabel : target.label, language));
    } catch (err) {
      setAnswerError(err instanceof Error ? err.message : String(err));
    } finally {
      setAnswerLoading(false);
    }
  }

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
        <h2>Ask the weather</h2>
        <p className="lede-small">
          Ask a simple outdoor question in Italian, English, or German. This uses rules plus NWS forecasts, with no AI credits.
        </p>
        <form onSubmit={handleWeatherQuestion} className="form-row">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Lohnt es sich morgen in Machias rauszugehen?"
            aria-label="Weather question"
          />
          <button type="submit" disabled={answerLoading}>
            {answerLoading ? "Thinking..." : "Ask"}
          </button>
        </form>
        {answerError && <p className="error">{answerError}</p>}
        {answerText && <pre className="result">{answerText}</pre>}
      </section>

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
            {alertsLoading ? "Loading..." : "Get alerts"}
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
            <option value={-1}>Custom coordinates...</option>
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
            {forecastLoading ? "Loading..." : "Get forecast"}
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
