import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#0b0d14";
const text = "#e9ecf5";
const muted = "#a3abc2";
const gold = "#f0b429";
const arc = "#4cc9f0";
const red = "#e23636";

/** Social share card: name, title, summary and college, with an arc reactor mark. */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "72px 80px",
          background: `radial-gradient(circle at 85% 30%, ${red}33, transparent 45%), radial-gradient(circle at 10% 90%, ${gold}26, transparent 40%), ${ink}`,
          color: text,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div style={{ width: 96, height: 8, borderRadius: 4, background: gold, marginBottom: 36 }} />
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 36, color: gold, marginTop: 24 }}>{profile.title}</div>
          <div style={{ fontSize: 28, color: muted, marginTop: 20, lineHeight: 1.4, maxWidth: 700 }}>
            {profile.summary}
          </div>
          <div style={{ fontSize: 24, color: muted, marginTop: 36 }}>
            {`${profile.department} · ${profile.college}`}
          </div>
        </div>
        <div
          style={{
            width: 260,
            height: 260,
            borderRadius: 130,
            border: `14px dashed ${gold}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 80px ${arc}55`,
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              border: `4px solid ${arc}`,
              background: `radial-gradient(circle, #ffffff, ${arc} 55%, ${ink})`,
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
