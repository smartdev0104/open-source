import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchRepos } from "./services/githubService";

jest.mock("./services/githubService");

describe("App Component", () => {
  it("renders correctly and handles input and button click", async () => {
    fetchRepos.mockResolvedValue([]);

    render(<App />);

    const input = screen.getByPlaceholderText("Enter GitHub organization name");
    const button = screen.getByRole("button", { name: "Search" });

    fireEvent.change(input, { target: { value: "test-org" } });
    expect(input.value).toBe("test-org");

    fireEvent.click(button);

    await waitFor(() => {
      expect(fetchRepos).toHaveBeenCalledWith("test-org");
    });
  });
});
