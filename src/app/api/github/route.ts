import { NextResponse } from "next/server";
import { fetchGitHubActivity } from "@/lib/github";

export const revalidate = 3600; // ISR: rebuild every hour

export async function GET() {
  try {
    const data = await fetchGitHubActivity();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity" },
      { status: 500 },
    );
  }
}
