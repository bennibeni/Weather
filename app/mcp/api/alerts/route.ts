import { NextRequest, NextResponse } from "next/server";
import { getAlertsText } from "../../../lib/nws";

export async function GET(request: NextRequest) {
  const state = request.nextUrl.searchParams.get("state") ?? "";
  try {
    const text = await getAlertsText(state);
    return NextResponse.json({ text });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
