const MONTHS = [
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
];

function parseIsoDate(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatEventDate(startIso, endIso = "") {
  const start = parseIsoDate(startIso);
  if (!start) return "";
  const end = parseIsoDate(endIso);

  const day = (d) => String(d.getDate());
  const month = (d) => MONTHS[d.getMonth()];
  const year = (d) => String(d.getFullYear());

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

const cases = [
  ["2026-06-06", "", "June 6, 2026"],
  ["2026-06-06", "2026-06-06", "June 6, 2026"],
  ["2026-06-05", "2026-06-06", "June 5–6, 2026"],
  ["2026-06-05", "2026-07-06", "June 5–July 6, 2026"],
  ["2026-06-05", "2027-07-06", "June 5, 2026–July 6, 2027"],
  ["2026-09-16", "", "September 16, 2026"],
  ["", "", ""],
];

let failed = 0;
for (const [start, end, expected] of cases) {
  const actual = formatEventDate(start, end);
  if (actual !== expected) {
    failed += 1;
    console.error(`FAIL ${start} → ${end || "(none)"}: got "${actual}", expected "${expected}"`);
  } else {
    console.log(`ok   ${start} → ${end || "(none)"} = ${actual}`);
  }
}

if (failed) {
  process.exit(1);
}
console.log(`All ${cases.length} date format cases passed.`);
