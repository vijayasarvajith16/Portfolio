import {
  siBootstrap,
  siC,
  siCplusplus,
  siCss,
  siDocker,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKubernetes,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPostman,
  siPython,
  siRabbitmq,
  siReact,
  siRedis,
  siScikitlearn,
  siSocketdotio,
  type SimpleIcon,
} from "simple-icons";

// Brand logos from Simple Icons (CC0). Keys are lower-case tech names as written in portfolio.ts.
const brands: Record<string, SimpleIcon> = {
  "c++": siCplusplus,
  c: siC,
  java: siOpenjdk, // the Java logo is not in Simple Icons; OpenJDK is the closest match
  javascript: siJavascript,
  python: siPython,
  html: siHtml5,
  css: siCss,
  bootstrap: siBootstrap,
  react: siReact,
  "node.js": siNodedotjs,
  express: siExpress,
  mongodb: siMongodb,
  mysql: siMysql,
  redis: siRedis,
  git: siGit,
  github: siGithub,
  docker: siDocker,
  postman: siPostman,
  rabbitmq: siRabbitmq,
  "socket.io": siSocketdotio,
  fastapi: siFastapi,
  kubernetes: siKubernetes,
  "isolation forest": siScikitlearn, // Isolation Forest is scikit-learn's implementation
};

// Line icons (24x24, stroked) for technologies without a brand logo.
const glyphs: Record<string, string> = {
  database: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  tree: "M12 3v5m0 0-5 5m5-5 5 5M7 13v4m10-4v4M5 21h4m6 0h4M10 3h4",
  network: "M12 5a2 2 0 1 0 0-.01M5 19a2 2 0 1 0 0-.01M19 19a2 2 0 1 0 0-.01M12 7v4m0 0-5.5 6.5M12 11l5.5 6.5",
  search: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5M14 3l5 5h-5V3Zm2.5 11a3 3 0 1 0 0 .01M18.6 16.6 21 19",
  layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5",
};

const glyphFor: Record<string, keyof typeof glyphs> = {
  oracle: "database",
  chromadb: "database",
  "groq api": "bolt",
  xgboost: "tree",
  "multi-agent ai": "network",
  rag: "search",
  "multimodal input": "layers",
};

/** Normalise names like "Express.js" or "Python (basics)" to a lookup key. */
const keyOf = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s*\(.*\)\s*$/, "")
    .replace(/^express\.js$/, "express")
    .trim();

/** Brand colours that are too dark for the dark theme fall back to the text colour. */
function readable(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance < 0.18 ? "var(--color-text)" : `#${hex}`;
}

/** Logo (or fallback line icon) for a technology name. Decorative: the name is always shown beside it. */
export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const key = keyOf(name);
  const brand = brands[key];
  if (brand) {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={readable(brand.hex)}>
        <path d={brand.path} />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="var(--color-arc)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={glyphs[glyphFor[key] ?? "code"]} />
    </svg>
  );
}
