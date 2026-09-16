export const POSTER_W = 1280;
export const POSTER_H = 720;
export const POSTER_PAD = 48;
export const LEFT_W = 781;
export const COL_GAP = 24;
export const INNER_H = POSTER_H - POSTER_PAD * 2;
export const RIGHT_W = POSTER_W - POSTER_PAD * 2 - LEFT_W - COL_GAP;

export const DISPLAY_SIZE = 96;
export const DISPLAY_TRACKING = -2.88;
export const DISPLAY_LEADING = 1;
export const BODY_SIZE = 20;
export const BODY_LEADING = 1.4;
export const KICKER_SIZE = 24;
export const KICKER_TRACKING = 1.2;

export const LOGO_H = 40;
export const LOGO_W = 161.852;
export const EVENT_LOGO_H = 48;
export const EVENT_LOGO_MAX_W = 280;
export const HEADSHOT_RADIUS = 4;

export const CREAM = "#FAF9F5";
export const CREAM_80 = "rgba(250, 249, 245, 0.8)";
export const MUTED = "#7F7E77";
export const INK = "#0D0D0C";

export const GROUNDS = {
  "Neutral 05": "#0D0D0C",
  "Orange 20": "#572330",
  "Blue 20": "#143F47",
} as const;

export type GroundName = keyof typeof GROUNDS;

export function isColorGround(name: GroundName): boolean {
  return name !== "Neutral 05";
}

export const LINE1_PRESETS = ["I’ll be at", "Meet me at"] as const;

export const STORAGE_KEY = "merciv-event-posts:v1";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export function slugFilename(value: string): string {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "event";
}
