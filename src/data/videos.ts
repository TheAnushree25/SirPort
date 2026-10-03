/**
 * Lecture videos and explainers, shown on /videos/ grouped by topic in the
 * order listed here. Add one object per video, e.g.
 *
 *   {
 *     title: "Public goods and the free-rider problem",
 *     url: "https://www.youtube.com/watch?v=VIDEO_ID",
 *     topic: "Public Economics",
 *     date: "2026-10-01",
 *     description: "A short explainer for undergraduate students.",
 *   },
 */
export interface Video {
  title: string;
  /** YouTube (or other) watch URL. */
  url: string;
  topic: string;
  /** ISO date, e.g. "2026-10-01". */
  date?: string;
  duration?: string;
  description?: string;
}

export const videos: Video[] = [];
