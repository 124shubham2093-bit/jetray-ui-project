import React from "react";
import { Check } from "lucide-react";

export default function AuthPromoBanner({
  icon: Icon,
  title,
  description,
  features,
  buttonText,
  onButtonClick,
  className = "",
}) {
  return (
    <div className={`bg-gradient-to-br from-emerald-500 to-teal-600 p-8 sm:p-10 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="w-40 h-32 rounded-xl bg-white/10 border border-white/20 mb-6 flex items-center justify-center">
        <Icon size={44} className="text-white/80" />
      </div>
      <h3 className="text-white font-extrabold text-xl">{title}</h3>
      <p className="text-emerald-50 text-xs mt-2 max-w-[220px]">{description}</p>
      {features && features.length > 0 && (
        <div className="space-y-1.5 mt-4 text-left">
          {features.map((t) => (
            <div key={t} className="flex items-center gap-2 text-white text-xs">
              <Check size={13} /> {t}
            </div>
          ))}
        </div>
      )}
      <button onClick={onButtonClick} className="mt-6 border border-white/60 text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-white/10">
        {buttonText}
      </button>
    </div>
  );
}
