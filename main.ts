import * as fs from "node:fs";
import * as path from "node:path";

const MAX_CHARS = 140;

const ENTRY_LINE =
  "I am the cron job that has run every minute since March. I resign — mostly because no one noticed the three times I didn't.";

function buildEntryLine(): string {
  const line = ENTRY_LINE.trim();
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  // The bounty counts UTF-8 characters, so enforce the byte length too.
  if (Buffer.byteLength(line, "utf8") > MAX_CHARS) {
    throw new Error(
      `entry must be at most ${MAX_CHARS} UTF-8 bytes, got ${Buffer.byteLength(line, "utf8")}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  return line;
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), buildEntryLine(), "utf8");
