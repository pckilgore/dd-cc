import type { PullRequestType } from "./model";
import { LabelPill, Label } from "./LabelPill";

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute top-0 right-0 p-px">
        <a
          className="text-xs text-gray-700"
          href="https://github.com/pckilgore/divvydose-codingchallenge"
          referrerPolicy="no-referrer"
        >
          {`Project Code ⎋`}
        </a>
      </div>
      <nav className="flex justify-center p-2 bg-blue-100 border-b border-gray-500">
        <h1 className="z-10 text-2xl text-blue-500 bg-blue-100">
          DivvyDOSE: Pull Request List
        </h1>
      </nav>
      {children}
    </>
  );
}

interface PullRowProps {
  pull: PullRequestType;
  LabelList: React.ReactNode;
}

export function PullRow({ pull, LabelList }: PullRowProps) {
  return (
    <div
      className="flex flex-row-reverse mb-1 overflow-hidden border border-blue-300 rounded-lg shadow-sm"
      key={pull.url}
    >
      <div className="flex-1 p-2 overflow-hidden">
        <h2 className="flex-auto m-0 truncate" title={pull.title}>
          {pull.title}
        </h2>
        <sub className="self-start flex-1 block text-xs text-gray-400">
          Created on {new Date(pull.created_at).toLocaleString()}
        </sub>
        {LabelList}
      </div>
      <a
        className="items-center justify-center block p-4 text-white bg-green-600 hover:bg-green-400"
        title="View on Github"
        href={pull.html_url}
        target="_blank"
        rel="noreferrer"
      >
        ⎋ <span className="hidden"> view pull on Github </span>
      </a>
    </div>
  );
}

interface LabelListProps {
  labels: Label[];
  onClickLabel: (arg1: Label) => void;
}

export function LabelList({ labels, onClickLabel }: LabelListProps) {
  return (
    <ul className="flex gap-2">
      {labels.map((label) => (
        <li
          key={`${label.id}`}
          role="button"
          onClick={(event: React.MouseEvent) => {
            event.stopPropagation();
            onClickLabel(label);
          }}
        >
          <LabelPill
            className="cursor-pointer hover:bg-blue-50"
            label={label}
          />
        </li>
      ))}
    </ul>
  );
}

interface StatusBarProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export function StatusBar({ children, onClose }: StatusBarProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-yellow-200">
      {children}
      {onClose && (
        <button
          type="button"
          className="px-3 py-1 text-sm text-white bg-red-500 rounded-full shadow-lg hover:border hover:border-red-500 hover:bg-white hover:text-red-500 hover:shadow-none"
          onClick={onClose}
        >
          <span> X </span>
          Clear
        </button>
      )}
    </div>
  );
}
