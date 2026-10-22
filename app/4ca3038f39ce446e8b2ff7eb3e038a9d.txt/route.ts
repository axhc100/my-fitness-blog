import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("4ca3038f39ce446e8b2ff7eb3e038a9d", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
