import fs from "node:fs";
import path from "node:path";

/** True when `file` (a site path like "/resume.pdf") exists in public/. Runs at build time. */
export function publicFileExists(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", file));
}

/** Download filename for the resume, from the owner's name: "Jane Doe" -> "Jane_Doe.pdf". */
export const resumeFileName = (name: string) => `${name.trim().replace(/\s+/g, "_")}.pdf`;
