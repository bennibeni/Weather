import { NextRequest, NextResponse } from "next/server";
import { getForecastText } from "../../../lib/nws";

export async function GET(request: NextRequest) {
  const latParam = request.nextUrl.searchParams.get("lat");
  const lonParam = request.nextUrl.searchParams.get("lon");
  const lat = latParam !== null ? Number(latParam) : NaN;
  const lon = lonParam !== null ? Number(lonParam) : NaN;

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    return NextResponse.json({ error: "Invalid latitude/longitude." }, { status: 400 });
  }

  try {
    const text = await getForecastText(lat, lon);
    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
