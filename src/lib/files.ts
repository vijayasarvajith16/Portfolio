import fs from "node:fs";
import path from "node:path";

/** True when `file` (a site path like "/resume.pdf") exists in public/. Runs at build time. */
export function publicFileExists(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", file));
}
