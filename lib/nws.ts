export interface AlertFeature {
  properties?: {
    event?: string;
    areaDesc?: string;
    severity?: string;
    status?: string;
    headline?: string;
  };
}

export interface AlertsResponse {
  features?: AlertFeature[];
}

export interface PointsResponse {
  properties?: {
    forecast?: string;
  };
}

export interface ForecastPeriod {
  name?: string;
  temperature?: number;
  temperatureUnit?: string;
  windSpeed?: string;
  windDirection?: string;
  shortForecast?: string;
}

export interface ForecastResponse {
  properties?: {
    periods?: ForecastPeriod[];
  };
}

export class NwsApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly url?: string,
  ) {
    super(message);
    this.name = "NwsApiError";
  }
}

export function getNwsApiBase(): string {
  return (process.env.NWS_API_BASE ?? "https://api.weather.gov").replace(
    /\/$/,
    "",
  );
}

export function getUserAgent(): string {
  return (
    process.env.NWS_USER_AGENT ??
    "weather-mcp-vercel/1.0 (+https://api.weather.gov)"
  );
}

export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": getUserAgent(),
      Accept: "application/geo+json, application/json",
    },
  });

  if (!response.ok) {
    throw new NwsApiError(
      `NWS request failed with HTTP ${response.status}`,
      response.status,
      url,
    );
  }

  return (await response.json()) as T;
}

export function normalizeStateCode(state: string): string {
  const normalized = state.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized)) {
    throw new Error(
      "State must be a two-letter US state or territory code, for example CA or NY.",
    );
  }
  return normalized;
}

export function formatAlert(feature: AlertFeature): string {
  const props = feature.properties ?? {};
  return [
    `Event: ${props.event ?? "Unknown"}`,
    `Area: ${props.areaDesc ?? "Unknown"}`,
    `Severity: ${props.severity ?? "Unknown"}`,
    `Status: ${props.status ?? "Unknown"}`,
    `Headline: ${props.headline ?? "No headline"}`,
  ].join("\n");
}

export function formatForecastPeriod(period: ForecastPeriod): string {
  const temperature =
    period.temperature === undefined
      ? "Unknown"
      : `${period.temperature}°${period.temperatureUnit ?? "F"}`;

  return [
    `${period.name ?? "Unknown"}:`,
    `Temperature: ${temperature}`,
    `Wind: ${period.windSpeed ?? "Unknown"} ${period.windDirection ?? ""}`.trim(),
    period.shortForecast ?? "No forecast available",
  ].join("\n");
}

export async function getAlertsText(state: string): Promise<string> {
  const stateCode = normalizeStateCode(state);
  const url = `${getNwsApiBase()}/alerts/active?area=${encodeURIComponent(stateCode)}`;
  const data = await fetchJson<AlertsResponse>(url);
  const features = data.features ?? [];

  if (features.length === 0) {
    return `No active alerts for ${stateCode}`;
  }

  return `Active alerts for ${stateCode}:\n\n${features.map(formatAlert).join("\n---\n")}`;
}

export async function getForecastText(
  latitude: number,
  longitude: number,
): Promise<string> {
  const pointsUrl = `${getNwsApiBase()}/points/${latitude.toFixed(4)},${longitude.toFixed(4)}`;
  const points = await fetchJson<PointsResponse>(pointsUrl);
  const forecastUrl = points.properties?.forecast;

  if (!forecastUrl) {
    throw new NwsApiError(
      "NWS points response did not include a forecast URL.",
      undefined,
      pointsUrl,
    );
  }

  const forecast = await fetchJson<ForecastResponse>(forecastUrl);
  const periods = forecast.properties?.periods ?? [];

  if (periods.length === 0) {
    return "No forecast periods available";
  }

  return `Forecast for ${latitude}, ${longitude}:\n\n${periods.map(formatForecastPeriod).join("\n---\n")}`;
}
