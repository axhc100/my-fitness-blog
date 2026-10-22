import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse("6a6909e660054fcbb7aba2c7f530f81f", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
