import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { PullRequest, DataState } from "./model";

const hookmock = jest.spyOn(PullRequest, "useList");

test("smoke test", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [],
    dataState: DataState.Loading,
    refetch: async () => {},
    error: null,
  }));

  render(<App />);
  const linkElement = screen.getByText(/divvydose/i);
  expect(linkElement).toBeInTheDocument();
});

test("loading", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [],
    dataState: DataState.Loading,
    refetch: async () => {},
    error: null,
  }));

  render(<App />);
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
});

test("error", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [],
    dataState: DataState.Error,
    refetch: async () => {},
    error: new Error("MyError"),
  }));

  render(<App />);

  const staticmessage = screen.getByText(/went wrong/i);
  const errmsg = screen.getByText(/MyError/i);
  expect(staticmessage).toBeInTheDocument();
  expect(errmsg).toBeInTheDocument();
});

test("data (no labels)", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [
      {
        id: 1,
        url: "https://myfakeurl.com",
        title: "My PR",
        labels: [],
        html_url: "https://fake.com",
      },
    ],
    dataState: DataState.Data,
    refetch: async () => {},
    error: null,
  }));

  render(<App />);

  const prTitle = screen.getByText(/My PR/i);
  expect(prTitle).toBeInTheDocument();
});

test("data (labels)", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [
      {
        id: 1,
        url: "https://myfakeurl.com",
        title: "My PR",
        labels: [{ id: 1, name: "Label 1" }],
        html_url: "https://fake.com",
      },
    ],
    dataState: DataState.Data,
    refetch: async () => {},
    error: null,
  }));

  render(<App />);

  const labelname = screen.getByText(/Label 1/i);
  expect(labelname).toBeInTheDocument();
});

test("data (filtering)", () => {
  hookmock.mockImplementationOnce(() => ({
    data: [
      {
        id: 1,
        url: "https://myfakeurl.com",
        title: "My PR",
        labels: [{ id: 1, url: "1", name: "Label 1" }],
        html_url: "https://fake.com",
      },
      {
        id: 2,
        url: "https://myfakeurl2.com",
        title: "My PR 2",
        labels: [{ id: 1, url: "1", name: "Label 1" }],
        html_url: "https://fake2.com",
      },
      {
        id: 3,
        url: "https://myfakeurl3.com",
        title: "My PR 3",
        labels: [{ id: 2, url: "2", name: "Label 2" }],
        html_url: "https://fake3.com",
      },
    ],
    dataState: DataState.Data,
    refetch: async () => {},
    error: null,
  }));

  render(<App />);

  act(() => {
    screen.getAllByText(/Label 1/i)[0].click();
  });
  expect(screen.getByText(/only showing/i)).toBeInTheDocument();

  expect(screen.getAllByText(/label 1/i).length).toBe(3);

  expect(screen.queryByText(/label 2/i)).not.toBeInTheDocument();

  act(() => {
    screen.getByText(/clear/i).click();
  });
  expect(screen.queryByText(/only showing/i)).not.toBeInTheDocument();
  expect(screen.getByText(/label 2/i)).toBeInTheDocument();
});
