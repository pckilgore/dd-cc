import React from "react";

import { PullRequest, PullRequestType, DataState } from "./model";
import { PageFrame, PullRow, LabelList, StatusBar } from "./Layout";
import { FetchError, Loading } from "./Utils";

import { LabelPill, Label } from "./LabelPill";

interface ListPullRequestProps {
  pullRequests: PullRequestType[];
  refetch: () => void;
}

function ListPullRequest({ pullRequests, refetch }: ListPullRequestProps) {
  const [filteredLabel, setFilteredLabel] = React.useState<Label | null>(null);

  // n * m over labels * pulls, optimize if expected to be large.
  const filteredPulls = pullRequests.filter((pull) =>
    filteredLabel
      ? pull.labels.some((label) => filteredLabel.id === label.id)
      : true
  );

  return (
    <>
      {filteredLabel !== null && (
        <StatusBar onClose={() => setFilteredLabel(null)}>
          <div className="flex items-center flex-0">
            <div className="pr-2 text-sm">Only Showing Pulls With Label:</div>
            <LabelPill className="shadow-none" label={filteredLabel} />
          </div>
        </StatusBar>
      )}

      <div className="p-4">
        {filteredPulls.map((pull) => (
          <PullRow
            key={pull.url}
            pull={pull}
            LabelList={
              <div className="py-2">
                <LabelList
                  labels={pull.labels}
                  onClickLabel={(label) => setFilteredLabel(label)}
                />
              </div>
            }
          />
        ))}
        <div className="p-4 flex justify-center">
          <button
            type="button"
            className="p-2 text-sm border-2 border-green-300 rounded-lg shadow-lg hover:shadow-none"
            onClick={refetch}
          >
            Refresh
          </button>
        </div>
      </div>
    </>
  );
}

function PullRequestDisplay() {
  const { dataState, data, error, refetch } = PullRequest.useList();

  switch (dataState) {
    case DataState.Loading:
      return <Loading />;
    case DataState.Data:
      return <ListPullRequest pullRequests={data} refetch={refetch} />;
    case DataState.Error:
      return <FetchError retry={refetch} error={error} />;
  }
}

function App() {
  return (
    <PageFrame>
      <PullRequestDisplay />
    </PageFrame>
  );
}

export default App;
