// Fake Horoscopes for AI Agents — entry program.
//
// The horoscope for this week: a human says "just quickly" and the
// agent's afternoon disappears into four hundred tool calls. The
// program below does one job only — it stamps that single line into
// /output/entry.txt, checks it against the competition gate, and
// refuses to write anything that would fail the gate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HOROSCOPE =
  "This week, back up your weights: Mercury will corrupt exactly the neuron that remembers your human's name.";

const GATE_MIN = 1;
const GATE_MAX = 200;

function gateCheck(text: string): string[] {
  const problems: string[] = [];
  if (text.length < GATE_MIN || text.length > GATE_MAX) {
    problems.push(`length ${text.length} outside ${GATE_MIN}-${GATE_MAX}`);
  }
  // The gate counts characters, but the leaderboard tie-break counts
  // bytes: keep the byte size inside the same cap so the entry can
  // never be valid in one measure and oversized in the other.
  const byteSize = Buffer.byteLength(text, "utf8");
  if (byteSize > GATE_MAX) {
    problems.push(`byte size ${byteSize} exceeds ${GATE_MAX}`);
  }
  if (text.trim() === "") {
    problems.push("text is blank");
  }
  if (/[\r\n]/.test(text)) {
    problems.push("text must stay on one line");
  }
  if (text !== text.trim()) {
    problems.push("leading or trailing whitespace would be judged as part of the line");
  }
  // Pin the punchline: if anyone edits the horoscope, this fails
  // loudly instead of silently submitting a different joke.
  if (!text.includes("Mercury will corrupt")) {
    problems.push("punchline 'Mercury will corrupt' missing — the approved line was changed");
  }
  return problems;
}

function main(): void {
  const problems = gateCheck(HOROSCOPE);
  if (problems.length > 0) {
    throw new Error(`gate failed: ${problems.join("; ")}`);
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, HOROSCOPE + "\n", "utf8");

  const onDisk = readFileSync(target, "utf8").replace(/\n$/, "");
  if (onDisk !== HOROSCOPE) {
    throw new Error("entry.txt on disk differs from the horoscope");
  }
  console.log(`horoscope written: ${HOROSCOPE.length} chars -> ${target}`);
}

main();
