import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#d10a0a",
          color: "#f2ede4",
          border: "8px solid #1c0505",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size },
  );
}
