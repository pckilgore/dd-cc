import React from "react";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

export const octokit = new Octokit({
  secret: process.env.dd_gh_token,
});

export enum DataState {
  Data = "DATA",
  Error = "Error",
  Loading = "Loading",
}

export type PullRequestType =
  RestEndpointMethodTypes["pulls"]["list"]["response"]["data"][0];

export const PullRequest = {
  /**
   * Eagerly fetch PRs and return struct describing operation state
   */
  useList() {
    const [dataState, setDataState] = React.useState(DataState.Loading);
    const [data, setData] = React.useState<PullRequestType[]>([]);
    const [error, setError] = React.useState<Error | null>(null);

    const refetch = async () => {
      try {
        setDataState(DataState.Loading);
        const { data: response } = await octokit.pulls.list({
          owner: "divvydose",
          repo: "fe-coding-challenge",
        });
        setDataState(DataState.Data);
        setData(response);
      } catch (err) {
        setDataState(DataState.Error);
        setError(err);
      }
    };

    React.useEffect(() => {
      refetch();
    }, []);

    return { data, dataState, error, refetch };
  },
};
