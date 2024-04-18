import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import CommitsView from "./CommitsView";
import { fetchCommits } from "../services/githubService";

jest.mock("../services/githubService");
jest.mock("./CommitDetails", () => (props) => (
  <div data-testid="commit-details">{props.commitData.commit.message}</div>
));
jest.mock("react-spinners", () => ({
  ClipLoader: () => <div data-testid="clip-loader"></div>,
}));

describe("CommitsView Component", () => {
  const repoName = "test-repo";
  const orgName = "test-org";

  test("loads and displays commits when button is clicked", async () => {
    const commits = [{ sha: "123abc", commit: { message: "Initial commit" } }];
    fetchCommits.mockResolvedValue(commits);

    render(<CommitsView repoName={repoName} orgName={orgName} />);

    const loadButton = screen.getByRole("button", { name: "Load Commits" });
    fireEvent.click(loadButton);

    expect(screen.getByTestId("clip-loader")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("clip-loader"));

    await waitFor(() => {
      expect(screen.getByTestId("commit-details")).toBeInTheDocument();
    });

    expect(screen.getByText("Initial commit")).toBeInTheDocument();
  });

  test("handles errors when fetching commits fails", async () => {
    fetchCommits.mockRejectedValue(new Error("Failed to fetch commits"));

    render(<CommitsView repoName={repoName} orgName={orgName} />);

    const loadButton = screen.getByRole("button", { name: "Load Commits" });
    fireEvent.click(loadButton);

    expect(screen.getByTestId("clip-loader")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("clip-loader"));

    await waitFor(() => {
      expect(screen.queryByTestId("commit-details")).not.toBeInTheDocument();
    });
  });
});
