import { MONTHS } from "./defaults";

export function parseIsoDate(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

export function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** "Month Day–Day, Year" — e.g. "June 6, 2026" or "June 5–6, 2026". */
export function formatEventDate(startIso: string, endIso = ""): string {
  const start = parseIsoDate(startIso);
  if (!start) return "";
  const end = parseIsoDate(endIso);

  const day = (d: Date) => String(d.getDate());
  const month = (d: Date) => MONTHS[d.getMonth()];
  const year = (d: Date) => String(d.getFullYear());

  if (!end || toIsoDate(end) === toIsoDate(start)) {
    return `${month(start)} ${day(start)}, ${year(start)}`;
  }

  const first = start <= end ? start : end;
  const last = start <= end ? end : start;

  if (first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear()) {
    return `${month(first)} ${day(first)}–${day(last)}, ${year(first)}`;
  }
  if (first.getFullYear() === last.getFullYear()) {
    return `${month(first)} ${day(first)}–${month(last)} ${day(last)}, ${year(first)}`;
  }
  return `${month(first)} ${day(first)}, ${year(first)}–${month(last)} ${day(last)}, ${year(last)}`;
}
