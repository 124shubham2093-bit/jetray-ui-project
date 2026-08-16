import React from "react";
import { leadActivity } from "../../data/leads";

export default function LeadActivityChart() {
  const width = 760;
  const height = 280;

  const padding = {
    top: 20,
    right: 20,
    bottom: 45,
    left: 45,
  };

  const chartWidth =
    width - padding.left - padding.right;

  const chartHeight =
    height - padding.top - padding.bottom;

  const maxValue =
    Math.ceil(
      Math.max(...leadActivity.map((item) => item.leads)) / 20
    ) * 20;

  const getX = (index) => {
    if (leadActivity.length === 1) {
      return padding.left + chartWidth / 2;
    }

    return (
      padding.left +
      (index / (leadActivity.length - 1)) * chartWidth
    );
  };

  const getY = (value) => {
    return (
      padding.top +
      chartHeight -
      (value / maxValue) * chartHeight
    );
  };

  const points = leadActivity
    .map(
      (item, index) =>
        `${getX(index)},${getY(item.leads)}`
    )
    .join(" ");

  const ySteps = 4;

  return (
    <div className="bg-[#11182a] border border-slate-800/70 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-semibold">
            Lead Activity
          </h3>

          <p className="text-slate-500 text-xs mt-1">
            Lead generation over the last 14 days
          </p>
        </div>

        <span className="text-xs text-slate-400">
          Last 14 days
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[650px]"
          role="img"
          aria-label="Lead activity over the last 14 days"
        >
          {Array.from({ length: ySteps + 1 }).map(
            (_, index) => {
              const value =
                (maxValue / ySteps) * index;

              const y = getY(value);

              return (
                <g key={index}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="rgba(148,163,184,0.12)"
                    strokeWidth="1"
                  />

                  <text
                    x={padding.left - 10}
                    y={y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="10"
                  >
                    {Math.round(value)}
                  </text>
                </g>
              );
            }
          )}

          <polyline
            points={points}
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {leadActivity.map((item, index) => {
            const x = getX(index);
            const y = getY(item.leads);

            return (
              <g key={item.day}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#8b5cf6"
                  stroke="#11182a"
                  strokeWidth="2"
                />

                <text
                  x={x}
                  y={height - 15}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="9"
                >
                  {item.day}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}