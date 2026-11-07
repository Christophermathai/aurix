import { ImageResponse } from "next/og";

export const alt =
  "AURIX 2027 — FitNFine Anti-Drug Fitness Festival in Ernakulam, Kochi (Jan 8–10, 2027)";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const events = [
    "MARATHON",
    "DEADLIFT",
    "U-20 FOOTBALL",
    "ARM WRESTLING",
    "PHYSIQUE",
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 68px",
          backgroundColor: "#d10a0a",
          backgroundImage:
            "radial-gradient(circle at 88% 14%, rgba(255, 110, 64, 0.55), transparent 52%), radial-gradient(circle at 12% 85%, rgba(28, 5, 5, 0.85), transparent 58%)",
          color: "#f2ede4",
          border: "12px solid #1c0505",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: "0.14em",
              }}
            >
              FITNFINE FITNESS CLUB PRESENTS
            </span>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              backgroundColor: "#f2ede4",
              color: "#1c0505",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.08em",
            }}
          >
            JAN 8–10, 2027 · ERNAKULAM, KOCHI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 186,
              fontWeight: 900,
              lineHeight: 0.86,
              letterSpacing: "-0.04em",
            }}
          >
            AURIX
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.01em",
            }}
          >
            FITNESS PUT INTO PLAY. SAY NO TO DRUGS.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "2px solid rgba(242, 237, 228, 0.45)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {events.map((eventName) => (
              <div
                key={eventName}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  backgroundColor: "#1c0505",
                  color: "#f2ede4",
                  fontSize: 20,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                }}
              >
                {eventName}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 700,
              opacity: 0.9,
            }}
          >
            3 DAYS · 5 EVENTS · KERALA
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
