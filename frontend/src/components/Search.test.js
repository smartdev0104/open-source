import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Search from "./Search";
import { fetchRepos } from "../services/githubService";

jest.mock("../services/githubService");
jest.mock("react-spinners", () => ({
  ClipLoader: () => <div data-testid="clip-loader"></div>,
}));

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    fetchRepos.mockResolvedValue([]);
    const setRepos = jest.fn();
    const setOrgName = jest.fn();

    render(<Search setRepos={setRepos} orgName="" setOrgName={setOrgName} />);

    const input = screen.getByPlaceholderText("Enter GitHub organization name");
    fireEvent.change(input, { target: { value: "test-org" } });

    const button = screen.getByRole("button", { name: "Search" });
    fireEvent.click(button);

    expect(setOrgName).toHaveBeenCalledWith("test-org");
  });

  it("displays an error message on fetch failure", async () => {
    fetchRepos.mockRejectedValue(new Error("Failed to fetch repositories"));
    render(
      <Search setRepos={() => {}} orgName="test-org" setOrgName={() => {}} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter GitHub organization name"),
      { target: { value: "test-org" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to fetch repositories. Please check the organization name and try again."
        )
      ).toBeInTheDocument();
    });
  });

  it("displays loading spinner during fetch", async () => {
    fetchRepos.mockReturnValue(
      new Promise((resolve) => setTimeout(() => resolve([]), 500))
    );

    render(
      <Search setRepos={() => {}} orgName="test-org" setOrgName={() => {}} />
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter GitHub organization name"),
      { target: { value: "test-org" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();

    expect(screen.getByTestId("clip-loader")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByTestId("clip-loader"));
  });
});
