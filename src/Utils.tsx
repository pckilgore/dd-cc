import { StatusBar } from "./Layout";
import logo from "./logo.svg";

interface FetchErrorProps {
  error: Error | null;
  retry: () => void;
}

export function FetchError(props: FetchErrorProps) {
  return (
    <StatusBar>
      <div className="flex">
        <div className="flex-0">
          <em>Something went wrong.</em>
        </div>
        <div className="flex-1 text-xs truncate" title={props.error?.message}>
          ${props.error?.message}
        </div>
        <button className="flex-0" type="button" onClick={props.retry}>
          Retry
        </button>
      </div>
    </StatusBar>
  );
}

export function Loading() {
  return (
    <div className="flex w-full flex-col flex-1 justify-center items-center p-4">
      <div className="w-36 h-36">
        <img className="animate-spin" src={logo} alt="Loading..." />
      </div>
      <span className="animate-pulse">Loading...</span>
    </div>
  );
}
