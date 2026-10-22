import { useId } from "react";
import type { DraperyStyleType, FabricSwatch } from "../catalog";

function HeaderDetails({
  type,
  width,
  y,
}: {
  type: DraperyStyleType;
  width: number;
  y: number;
}) {
  const center = width / 2;
  const start = 74;
  const end = width - 74;
  const span = end - start;

  switch (type) {
    case "ripple":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.72">
          {Array.from({ length: 10 }).map((_, index) => {
            const x = start + (span / 9) * index;
            return (
              <path
                key={x}
                d={`M${x} ${y}c 11 9 11 22 0 31c -11 9 -11 22 0 31`}
              />
            );
          })}
        </g>
      );
    case "tailored":
    case "inverted":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7">
          {Array.from({ length: 7 }).map((_, index) => {
            const x = start + (span / 6) * index;
            return (
              <g key={x}>
                <path d={`M${x} ${y}h24l-7 34h-10Z`} />
                <path d={`M${x + 4} ${y + 34}v188`} opacity="0.45" />
              </g>
            );
          })}
        </g>
      );
    case "pinch":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.72">
          {Array.from({ length: 6 }).map((_, index) => {
            const x = start + (span / 5) * index;
            return (
              <g key={x}>
                <path d={`M${x} ${y}h30l-11 28h-8Z`} />
                <path d={`M${x + 6} ${y + 30}c 0 26 -6 54 -12 74`} />
                <path d={`M${x + 24} ${y + 30}c 0 26 6 54 12 74`} />
              </g>
            );
          })}
        </g>
      );
    case "grommet":
      return (
        <g opacity="0.68">
          <path d="M52 64h316" stroke="currentColor" fill="none" />
          {Array.from({ length: 10 }).map((_, index) => {
            const x = start + (span / 9) * index;
            return (
              <g key={x} stroke="currentColor" fill="none">
                <circle cx={x} cy={y} r="9" />
                <circle cx={x} cy={y} r="4.5" opacity="0.45" />
              </g>
            );
          })}
        </g>
      );
    case "goblet":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.72">
          {Array.from({ length: 7 }).map((_, index) => {
            const x = start + (span / 6) * index;
            return (
              <path
                key={x}
                d={`M${x} ${y}c 9 3 16 8 18 20c 2 12 -7 15 -8 28c -1 13 8 18 8 28`}
              />
            );
          })}
        </g>
      );
    case "euro":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7">
          {Array.from({ length: 7 }).map((_, index) => {
            const x = start + (span / 6) * index;
            return (
              <g key={x}>
                <path d={`M${x} ${y}h27v22h-27Z`} />
                <path d={`M${x + 13.5} ${y + 22}v168`} opacity="0.5" />
              </g>
            );
          })}
        </g>
      );
    case "rod":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7">
          <path d={`M52 57h316`} />
          <path d={`M${start} 57c 8 13 14 24 15 40c 2 37 0 78 -1 124c -1 45 4 79 7 109`} />
          <path d={`M${end} 57c -8 13 -14 24 -15 40c -2 37 0 78 1 124c 1 45 -4 79 -7 109`} />
          {Array.from({ length: 16 }).map((_, index) => {
            const x = start + 12 + ((span - 24) / 15) * index;
            return (
              <path
                key={x}
                d={`M${x} 85v206`}
                opacity="0.22"
                strokeWidth="0.9"
              />
            );
          })}
        </g>
      );
    case "tab":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.72">
          <path d="M52 55h316" />
          {Array.from({ length: 7 }).map((_, index) => {
            const x = start + (span / 6) * index;
            return (
              <g key={x}>
                <path d={`M${x} 55h23v22h-23Z`} />
                <path d={`M${x + 11} 77v163`} opacity="0.45" />
              </g>
            );
          })}
        </g>
      );
    case "tie":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.72">
          <path d="M52 55h316" />
          {Array.from({ length: 6 }).map((_, index) => {
            const x = start + (span / 5) * index;
            return (
              <g key={x}>
                <path d={`M${x} 55c 3 17 12 24 23 24s20 -7 23 -24`} />
                <path d={`M${x + 18} 80c 7 12 4 25 10 36`} opacity="0.55" />
              </g>
            );
          })}
        </g>
      );
    case "pencil":
      return (
        <g fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.5">
          {Array.from({ length: 32 }).map((_, index) => {
            const x = start + (span / 31) * index;
            return <path key={x} d={`M${x} ${y}v232`} />;
          })}
        </g>
      );
    case "flat":
    default:
      return (
        <g fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.55">
          <path d={`M${start} ${y}h${span}`} />
          <path d={`M${start + 2} ${y + 10}v252`} />
          <path d={`M${end - 2} ${y + 10}v252`} />
          <path d={`M${center} ${y + 10}v252`} opacity="0.35" />
        </g>
      );
  }
}

function Folds({
  type,
  width,
  top,
  bottom,
}: {
  type: DraperyStyleType;
  width: number;
  top: number;
  bottom: number;
}) {
  const center = width / 2;
  const count = 8;
  return (
    <g fill="none" stroke="rgba(30, 25, 20, 0.23)" strokeWidth="1">
      {Array.from({ length: count }).map((_, index) => {
        const t = (index + 0.6) / count;
        const leftX = 66 + (center - 86) * t;
        const rightX = width - 66 - (width / 2 - 86) * t;
        return (
          <g key={index}>
            <path d={`M${leftX} ${top}c 7 52 -5 74 1 116s -2 71 3 112`} />
            <path
              d={`M${rightX} ${top}c -7 50 4 77 -1 119s 3 69 -2 109`}
              opacity="0.75"
            />
          </g>
        );
      })}
      <path
        d={`M66 ${bottom}c 46 -5 78 3 132 -1c 44 4 89 -2 132 3`}
        stroke="rgba(30, 25, 20, 0.2)"
        strokeWidth="2"
      />
    </g>
  );
}

export function DraperyHeaderDiagram({
  type,
  tone = "#cbbda7",
}: {
  type: DraperyStyleType;
  tone?: string;
}) {
  const id = useId();
  const width = 260;
  return (
    <svg
      viewBox="0 0 260 180"
      className="drapery-header-diagram"
      role="img"
      aria-label={`Technical illustration of ${type} drapery header`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ece7de" />
          <stop offset="1" stopColor="#d8d0c3" />
        </linearGradient>
        <linearGradient id={`${id}-fabric`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={tone} stopOpacity="0.96" />
          <stop offset="0.48" stopColor="#f7f2e9" stopOpacity="0.76" />
          <stop offset="1" stopColor={tone} stopOpacity="0.88" />
        </linearGradient>
      </defs>
      <rect width="260" height="180" fill={`url(#${id}-bg)`} />
      <path
        d="M54 48c26 -9 126 -9 152 0v143H54Z"
        fill={`url(#${id}-fabric)`}
      />
      <path d="M44 55h172" stroke="#39342d" strokeWidth="1.2" opacity="0.6" />
      <g style={{ color: "#484038" }} transform="translate(0 8)">
        <HeaderDetails type={type} width={width} y={78} />
      </g>
      <Folds type={type} width={width} top={104} bottom={178} />
      <rect
        width="260"
        height="180"
        fill="none"
        stroke="rgba(32,30,27,0.08)"
      />
    </svg>
  );
}

export function RomanStyleDiagram({
  type,
}: {
  type:
    | "classic"
    | "relaxed"
    | "pleated"
    | "hobbled"
    | "knife"
    | "ribbed";
}) {
  const id = useId();
  const folds = {
    classic: [46, 78, 110, 142, 174, 206],
    relaxed: [58, 94, 132, 172, 210],
    pleated: [52, 86, 120, 154, 188, 220],
    hobbled: [54, 96, 140, 186, 228],
    knife: [44, 74, 104, 134, 164, 194, 224],
    ribbed: [46, 72, 98, 124, 150, 176, 202, 228],
  }[type];

  return (
    <svg
      viewBox="0 0 280 260"
      className="roman-style-diagram"
      role="img"
      aria-label={`Line illustration of ${type} Roman shade style`}
    >
      <defs>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8e2d7" />
          <stop offset="1" stopColor="#d4cbbb" />
        </linearGradient>
      </defs>
      <rect width="280" height="260" fill="transparent" />
      <rect
        x="42"
        y="24"
        width="196"
        height="212"
        fill="none"
        stroke="#3e3a33"
        strokeWidth="1.2"
      />
      <path d="M34 31h212" stroke="#3e3a33" strokeWidth="1.2" />
      <rect
        x="48"
        y="38"
        width="184"
        height="192"
        fill={`url(#${id}-shade)`}
        stroke="#585248"
        strokeWidth="0.8"
      />
      {folds.map((y, index) => (
        <g key={`${type}-${y}`}>
          <path
            d={`M48 ${y}c 34 ${type === "relaxed" ? 9 : 5} 64 ${type === "relaxed" ? 9 : 4} 92 ${type === "relaxed" ? 5 : 2}c 31 -3 60 -2 92 3`}
            fill="none"
            stroke="#6b6358"
            strokeWidth={type === "hobbled" ? 1.4 : 1}
            opacity={index === folds.length - 1 ? 0.75 : 0.55}
          />
          {type === "knife" && (
            <path
              d={`M48 ${y + 4}c 29 -9 61 -6 92 0c 31 4 62 1 92 -4`}
              fill="none"
              stroke="#8b8174"
              strokeWidth="0.8"
              opacity="0.45"
            />
          )}
        </g>
      ))}
      {type === "ribbed" &&
        Array.from({ length: 13 }).map((_, index) => (
          <path
            key={index}
            d={`M${56 + index * 14} 40v188`}
            stroke="#8f8577"
            strokeWidth="0.55"
            opacity="0.35"
          />
        ))}
      {type === "pleated" && (
        <g fill="none" stroke="#6b6358" strokeWidth="0.8" opacity="0.55">
          <path d="M48 50h184M48 67h184" />
        </g>
      )}
      <path
        d="M42 24v-7h196v7"
        fill="none"
        stroke="#3e3a33"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function CurtainHeaderShape({
  type,
  y,
}: {
  type: DraperyStyleType;
  y: number;
}) {
  const leftStart = 34;
  const rightEnd = 366;
  const leftEnd = 172;
  const rightStart = 228;

  const leftPleats = Array.from({ length: 7 });
  const rightPleats = Array.from({ length: 7 });

  if (type === "grommet") {
    return (
      <g fill="none" stroke="#2b2721" strokeWidth="1.6" opacity="0.82">
        <path d="M26 66h348" />
        {Array.from({ length: 6 }).map((_, index) => (
          <g key={`left-${index}`}>
            <circle
              cx={leftStart + (leftEnd - leftStart - 16) * (index / 5) + 8}
              cy={y}
              r="9"
            />
            <circle
              cx={rightStart + (rightEnd - rightStart - 16) * (index / 5) + 8}
              cy={y}
              r="9"
            />
          </g>
        ))}
      </g>
    );
  }

  if (type === "tab" || type === "tie") {
    return (
      <g fill="none" stroke="#2b2721" strokeWidth="1.6" opacity="0.76">
        <path d="M26 58h348" />
        {leftPleats.map((_, index) => {
          const x = leftStart + (leftEnd - leftStart - 22) * (index / 6);
          return type === "tab" ? (
            <path
              key={`left-tab-${index}`}
              d={`M${x} 58h17v20h-17Z`}
            />
          ) : (
            <path
              key={`left-tie-${index}`}
              d={`M${x} 58c 4 15 12 21 21 21s16 -6 20 -21`}
            />
          );
        })}
        {rightPleats.map((_, index) => {
          const x = rightStart + (rightEnd - rightStart - 22) * (index / 6);
          return type === "tab" ? (
            <path
              key={`right-tab-${index}`}
              d={`M${x} 58h17v20h-17Z`}
            />
          ) : (
            <path
              key={`right-tie-${index}`}
              d={`M${x} 58c 4 15 12 21 21 21s16 -6 20 -21`}
            />
          );
        })}
      </g>
    );
  }

  return (
    <g fill="none" stroke="#2b2721" strokeWidth="1.2" opacity="0.6">
      <path d="M28 60h344" />
      {leftPleats.map((_, index) => {
        const x = leftStart + (leftEnd - leftStart - 14) * (index / 6);
        return (
          <path
            key={`left-pleat-${index}`}
            d={
              type === "ripple"
                ? `M${x} 60c 8 8 8 20 0 28`
                : type === "goblet"
                  ? `M${x} 60c 7 3 11 8 12 16v14`
                  : type === "flat"
                    ? `M${x} 60v26`
                    : `M${x} 60l7 36M${x + 12} 60l-4 36`
            }
          />
        );
      })}
      {rightPleats.map((_, index) => {
        const x = rightStart + (rightEnd - rightStart - 14) * (index / 6);
        return (
          <path
            key={`right-pleat-${index}`}
            d={
              type === "ripple"
                ? `M${x} 60c 8 8 8 20 0 28`
                : type === "goblet"
                  ? `M${x} 60c 7 3 11 8 12 16v14`
                  : type === "flat"
                    ? `M${x} 60v26`
                    : `M${x} 60l7 36M${x + 12} 60l-4 36`
            }
          />
        );
      })}
    </g>
  );
}

export function CurtainPreview({
  type,
  fabric,
}: {
  type: DraperyStyleType;
  fabric: FabricSwatch;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 400 640"
      className="curtain-preview-svg"
      role="img"
      aria-label={`${fabric.colorName} ${fabric.collection} fabric shown as ${type} pleat drapery`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${id}-curtain`} x1="0" y1="0" x2="1" y2="0.12">
          <stop offset="0" stopColor={fabric.tone} stopOpacity="0.97" />
          <stop offset="0.16" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="0.34" stopColor={fabric.tone} stopOpacity="0.98" />
          <stop offset="0.56" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.78" stopColor={fabric.tone} stopOpacity="0.94" />
          <stop offset="1" stopColor="#2b2721" stopOpacity="0.24" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-10%" width="160%" height="140%">
          <feDropShadow
            dx="4"
            dy="10"
            stdDeviation="10"
            floodColor="#1e1a16"
            floodOpacity="0.25"
          />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        <path
          d="M34 62c24 -1 53 -2 75 2c19 3 36 1 62 0v542c-22 5 -52 2 -73 0c-20 -2 -43 1 -64 -1Z"
          fill={`url(#${id}-curtain)`}
        />
        <path
          d="M228 64c23 -2 42 0 65 -2c23 -2 46 3 73 0v541c-25 4 -48 0 -71 1c-24 1 -45 3 -67 -1Z"
          fill={`url(#${id}-curtain)`}
        />
      </g>

      <CurtainHeaderShape type={type} y={62} />

      <g fill="none" stroke="#231f1a" strokeWidth="0.9" opacity="0.2">
        {Array.from({ length: 12 }).map((_, index) => {
          const x = 42 + index * 10.5;
          return (
            <path
              key={`left-fold-${index}`}
              d={`M${x} 92c 10 66 -10 117 -2 193s -7 152 2 318`}
            />
          );
        })}
        {Array.from({ length: 12 }).map((_, index) => {
          const x = 238 + index * 10.5;
          return (
            <path
              key={`right-fold-${index}`}
              d={`M${x} 94c -8 61 10 122 1 191s 7 154 -2 321`}
            />
          );
        })}
      </g>

      <path
        d="M34 600c 27 4 52 1 78 3c 20 1 39 -2 59 -1c 27 2 57 5 82 1c 29 5 52 -4 73 1"
        fill="none"
        stroke="#201c18"
        strokeWidth="2"
        opacity="0.18"
      />
    </svg>
  );
}
