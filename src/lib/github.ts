const GITHUB_USERNAME = "AnamGTR99";

const CONTRIBUTIONS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

export interface HeatmapDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubActivityData {
  commitsToday: number;
  currentStreak: number;
  totalContributions: number;
  contributionYear: number;
  heatmap: HeatmapDay[];
  lastUpdated: string;
}

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

interface DayEntry {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

function calculateStreak(days: DayEntry[], todayStr: string): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.count > 0) {
      streak++;
    } else if (day.date === todayStr) {
      // Today isn't over yet — don't break streak
      continue;
    } else {
      break;
    }
  }
  return streak;
}

/**
 * Primary source — public contributions API (github-contributions-api.jogruber.de).
 * Scrapes the public GitHub contribution graph; needs no token, never expires.
 * Returns a rolling last-365-days window.
 */
async function fetchContributionsPublic(todayStr: string): Promise<DayEntry[]> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) throw new Error(`Contributions API ${res.status}`);
  const data: {
    contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  } = await res.json();
  return data.contributions
    .filter((d) => d.date <= todayStr)
    .map((d) => ({ date: d.date, count: d.count, level: d.level }));
}

/**
 * Enhanced source — GitHub GraphQL API. Only used when a valid GITHUB_TOKEN
 * is configured; any failure (expired token, rate limit) falls back to the
 * public source so the section never goes dark again.
 */
async function fetchContributionsGraphQL(
  token: string,
  now: Date,
): Promise<DayEntry[]> {
  const from = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username: GITHUB_USERNAME,
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  });
  const data = await res.json();
  const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) throw new Error("GraphQL contribution fetch failed");
  return calendar.weeks.flatMap(
    (w: {
      contributionDays: {
        date: string;
        contributionCount: number;
        contributionLevel: string;
      }[];
    }) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        level: LEVEL_MAP[d.contributionLevel] ?? 0,
      })),
  );
}

export async function fetchGitHubActivity(): Promise<GitHubActivityData> {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  const token = process.env.GITHUB_TOKEN;

  // Contributions: try the authenticated API when a token exists, but always
  // fall back to the public source — a dead token must never blank the section.
  let days: DayEntry[] | null = null;
  if (token) {
    try {
      days = await fetchContributionsGraphQL(token, now);
    } catch {
      days = null;
    }
  }
  if (!days) {
    days = await fetchContributionsPublic(todayStr);
  }

  const currentYear = now.getFullYear();
  const totalContributions = days
    .filter((d) => d.date.startsWith(String(currentYear)))
    .reduce((sum, d) => sum + d.count, 0);

  const commitsToday =
    days.find((d) => d.date === todayStr)?.count ?? 0;

  return {
    commitsToday,
    currentStreak: calculateStreak(days, todayStr),
    totalContributions,
    contributionYear: currentYear,
    heatmap: days.slice(-84).map((d) => ({
      date: d.date,
      count: d.count,
      level: d.level,
    })),
    lastUpdated: now.toISOString(),
  };
}
