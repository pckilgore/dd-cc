import type { PullRequestType } from "./model";

export type Label = PullRequestType["labels"][0];

interface LabelProps {
  label: Label;
  className?: string;
}

export function LabelPill({ label, className = "" }: LabelProps) {
  return (
    <div
      className={`bg-white flex flex-1 justify-around items-center px-1 h-6 rounded-full border shadow-md border-gray-900 ${className}`}
    >
      <div
        style={{ backgroundColor: `#${label.color}` }}
        className="w-3 h-3 rounded-full"
      />
      <div className="px-1 text-xs">{label.name}</div>
    </div>
  );
}
