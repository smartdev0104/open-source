import React from "react";
import { render, screen } from "@testing-library/react";
import ReposList from "./ReposList";
import CommitsView from "./CommitsView";

jest.mock("./CommitsView", () => (props) => (
  <div
    data-testid="commits-view"
    repoName={props.repoName}
    orgName={props.orgName}
  >
    Commits for {props.repoName}
  </div>
));

describe("ReposList Component", () => {
  const repos = [
    { id: 1, name: "Repo1", forks_count: 10 },
    { id: 2, name: "Repo2", forks_count: 20 },
  ];

  it("renders a list of repositories with names and fork counts", () => {
    render(<ReposList repos={repos} orgName="test-org" />);

    repos.forEach((repo) => {
      expect(screen.getByText(`${repo.name} -`)).toBeInTheDocument();
      expect(
        screen.getByText(`Forks: ${repo.forks_count}`)
      ).toBeInTheDocument();
    });
  });

  it("includes a CommitsView component for each repository with the correct props", () => {
    render(<ReposList repos={repos} orgName="test-org" />);

    const commitsViews = screen.getAllByTestId("commits-view");
    expect(commitsViews.length).toBe(repos.length);

    commitsViews.forEach((view, index) => {
      expect(view.getAttribute("repoName")).toBe(repos[index].name);
      expect(view.getAttribute("orgName")).toBe("test-org");
    });
  });
});
