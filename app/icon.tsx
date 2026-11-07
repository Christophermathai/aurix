import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d10a0a",
          color: "#f2ede4",
          fontSize: 44,
          fontWeight: 900,
          letterSpacing: "-0.04em",
          border: "4px solid #f2ede4",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
