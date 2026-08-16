import React from "react";
import {
  Users,
  CalendarDays,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { leadStats } from "../../data/leads";

const cards = [
  {
    label: "Total Leads",
    value: leadStats.totalLeads,
    icon: Users,
    description: "All leads received",
  },
  {
    label: "Today's Leads",
    value: leadStats.todaysLeads,
    icon: CalendarDays,
    description: "Leads received today",
  },
  {
    label: "Interested",
    value: leadStats.interested,
    icon: Heart,
    description: "Interested prospects",
  },
  {
    label: "Converted",
    value: leadStats.converted,
    icon: CheckCircle2,
    description: "Successfully converted",
  },
];

export default function LeadStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="bg-[#11182a] border border-slate-800/70 rounded-xl p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {card.label}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {card.value.toLocaleString()}
                </h3>

                <p className="text-slate-500 text-xs mt-2">
                  {card.description}
                </p>
              </div>

              <div className="w-10 h-10 rounded-lg bg-violet-600/15 flex items-center justify-center">
                <Icon
                  size={19}
                  className="text-violet-400"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}