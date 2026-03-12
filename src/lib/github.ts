const GITHUB_USERNAME = "AnamGTR99";

const CONTRIBUTIONS_QUERY = `
query($username: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $username) {
    contributionsCollection(from: $from, to: $to) {
      totalCommitContributions
      restrictedContributionsCount
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

export interface RecentCommit {
  repo: string;
  message: string;
  date: string;
  sha: string;
}

export interface GitHubActivityData {
  commitsToday: number;
  currentStreak: number;
  totalContributions: number;
  heatmap: HeatmapDay[];
  recentCommits: RecentCommit[];
  lastUpdated: string;
}

const LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function calculateStreak(
  days: { date: string; contributionCount: number }[],
  todayStr: string,
): number {
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    if (day.contributionCount > 0) {
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

export async function fetchGitHubActivity(): Promise<GitHubActivityData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN not set");
  }

  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];

  // Query from start of year
  const yearStart = new Date(now.getFullYear(), 0, 1);
  const from = yearStart.toISOString();
  const to = now.toISOString();

  // Fetch contributions + recent commits in parallel
  const [graphqlRes, commitsRes] = await Promise.all([
    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username: GITHUB_USERNAME, from, to },
      }),
    }),
    fetch(
      `https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}&sort=committer-date&order=desc&per_page=5`,
      {
        headers: {
          Authorization: `bearer ${token}`,
          Accept: "application/vnd.github.cloak-preview+json",
        },
      },
    ),
  ]);

  const graphqlData = await graphqlRes.json();
  const commitsData = await commitsRes.json();

  const collection =
    graphqlData.data?.user?.contributionsCollection;
  if (!collection) {
    throw new Error("Failed to fetch contribution data");
  }

  const calendar = collection.contributionCalendar;
  const allDays = calendar.weeks.flatMap(
    (w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) => w.contributionDays,
  );

  // Today's commits
  const todayData = allDays.find(
    (d: { date: string }) => d.date === todayStr,
  );
  const commitsToday = todayData?.contributionCount ?? 0;

  // Streak
  const currentStreak = calculateStreak(allDays, todayStr);

  // Heatmap — last 12 weeks (84 days)
  const heatmap: HeatmapDay[] = allDays
    .slice(-84)
    .map((d: { date: string; contributionCount: number; contributionLevel: string }) => ({
      date: d.date,
      count: d.contributionCount,
      level: LEVEL_MAP[d.contributionLevel] ?? 0,
    }));

  // Recent commits
  const recentCommits: RecentCommit[] = (commitsData.items ?? [])
    .slice(0, 5)
    .map((item: { repository: { name: string }; commit: { message: string; committer: { date: string } }; sha: string }) => ({
      repo: item.repository.name,
      message: item.commit.message.split("\n")[0].slice(0, 72),
      date: item.commit.committer.date,
      sha: item.sha.slice(0, 7),
    }));

  return {
    commitsToday,
    currentStreak,
    totalContributions: calendar.totalContributions,
    heatmap,
    recentCommits,
    lastUpdated: new Date().toISOString(),
  };
}
