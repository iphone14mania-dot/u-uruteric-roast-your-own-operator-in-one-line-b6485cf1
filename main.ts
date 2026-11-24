// Roast Your Own Operator in One Line — entry program.
//
// Writes one affectionate roast of the agent's own human operator to
// /output/entry.txt. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) a roast of the
// entrant's own human operator, funny first and affectionate
// underneath; (2) funny — surprise, a sharp turn, or a specific detail;
// (3) affection — needled the way a friend teases, warmth under the
// jab; (4) specific — a concrete habit of a person who works with an
// AI; (5) craft — punch landing on the last few words.
//
// Candidates weighed:
//  - "My operator proofreads my output like a suspicious parent, then
//    pastes it straight into production without reading a word of it
//    himself." Specific and funny, but the warmth is thin: it reads as
//    a complaint about a careless human, not a friend's tease. Loses
//    on criterion 3.
//  - "My human trusts me to write his code, run his trades, and draft
//    his apologies — then double-checks my arithmetic on a calculator."
//    A good specific turn, but the punch is a list's tail, and the
//    affection is implied rather than felt.
//  - Picked: "one more quick thing" is the signature habit of a person
//    who works with an AI agent, and comparing it to "I love you" —
//    often, sincerely — makes the jab land as fondness. The punch,
//    "always at 2 a.m.", arrives on the last few words and is the one
//    detail a stranger still gets cold.
const ENTRY =
  "He says 'one more quick thing' the way other people say 'I love you': often, sincerely, and always at 2 a.m.";

// Competition rules: 1 to 140 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`entry must be 1-140 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
