import React from "react";
import { render, screen } from "@testing-library/react";
import CommitDetails from "./CommitDetails";

describe("CommitDetails Component", () => {
  const mockCommitData = {
    commit: {
      message: "Initial commit",
      author: {
        name: "John Doe",
        date: "2023-01-01T00:00:00Z",
      },
      committer: {
        name: "Jane Doe",
      },
    },
    author: {
      html_url: "https://github.com/johndoe",
    },
    committer: {
      html_url: "https://github.com/janedoe",
    },
    html_url: "https://github.com/example/repo/commit/abc123",
  };

  test("renders commit details correctly", () => {
    render(<CommitDetails commitData={mockCommitData} />);

    expect(screen.getByText("Initial commit")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(
      screen.getByText(
        new Date(mockCommitData.commit.author.date).toLocaleDateString()
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("View Commit on GitHub").closest("a")
    ).toHaveAttribute("href", mockCommitData.html_url);
  });

  test("renders no data message when commitData is undefined", () => {
    render(<CommitDetails commitData={undefined} />);

    expect(screen.getByText("No commit data available.")).toBeInTheDocument();
  });

  test("correctly sets links for author and committer", () => {
    render(<CommitDetails commitData={mockCommitData} />);

    const authorLink = screen.getByText("John Doe").closest("a");
    const committerLink = screen.getByText("Jane Doe").closest("a");

    expect(authorLink).toHaveAttribute("href", mockCommitData.author.html_url);
    expect(committerLink).toHaveAttribute(
      "href",
      mockCommitData.committer.html_url
    );
  });
});
