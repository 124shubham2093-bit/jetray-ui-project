import React from "react";
import { leadSources } from "../../data/leads";

export default function LeadSourceChart() {
  const total = leadSources.reduce(
    (sum, source) => sum + source.value,
    0
  );

  let currentAngle = -90;

  const radius = 82;
  const center = 110;

  const polarToCartesian = (angle) => {
    const radians = (angle * Math.PI) / 180;

    return {
      x:
        center +
        radius * Math.cos(radians),
      y:
        center +
        radius * Math.sin(radians),
    };
  };

  const createArc = (
    startAngle,
    endAngle
  ) => {
    const start =
      polarToCartesian(endAngle);

    const end =
      polarToCartesian(startAngle);

    const largeArcFlag =
      endAngle - startAngle > 180
        ? 1
        : 0;

    return [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
      "Z",
    ].join(" ");
  };

  const segments = leadSources.map(
    (source) => {
      const angle =
        (source.value / total) * 360;

      const startAngle =
        currentAngle;

      const endAngle =
        currentAngle + angle;

      currentAngle = endAngle;

      return {
        ...source,
        startAngle,
        endAngle,
        percentage: Math.round(
          (source.value / total) * 100
        ),
      };
    }
  );

  const segmentClasses = [
    "fill-violet-500",
    "fill-cyan-500",
    "fill-emerald-500",
    "fill-amber-400",
    "fill-slate-500",
  ];

  const dotClasses = [
    "bg-violet-500",
    "bg-cyan-500",
    "bg-emerald-500",
    "bg-amber-400",
    "bg-slate-500",
  ];

  return (
    <div className="bg-[#11182a] border border-slate-800/70 rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold">
          Lead Sources
        </h3>

        <p className="text-slate-500 text-xs mt-1">
          Distribution of incoming leads
        </p>
      </div>

      <div className="flex flex-col xl:flex-row items-center gap-6">
        <div className="relative shrink-0">
          <svg
            viewBox="0 0 220 220"
            className="w-52 h-52"
            role="img"
            aria-label="Lead sources distribution"
          >
            {segments.map(
              (segment, index) => (
                <path
                  key={segment.name}
                  d={createArc(
                    segment.startAngle,
                    segment.endAngle
                  )}
                  className={`${segmentClasses[index]} stroke-[#11182a]`}
                  strokeWidth="2"
                />
              )
            )}

            <circle
              cx="110"
              cy="110"
              r="50"
              fill="#11182a"
            />

            <text
              x="110"
              y="105"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="20"
              fontWeight="700"
            >
              {total.toLocaleString()}
            </text>

            <text
              x="110"
              y="125"
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
            >
              Total Leads
            </text>
          </svg>
        </div>

        <div className="w-full space-y-3">
          {segments.map(
            (segment, index) => (
              <div
                key={segment.name}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${dotClasses[index]}`}
                  />

                  <span className="text-slate-300 text-sm">
                    {segment.name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium">
                    {segment.value.toLocaleString()}
                  </span>

                  <span className="text-slate-500 text-xs">
                    {segment.percentage}%
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}