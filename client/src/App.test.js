import { render, screen } from "@testing-library/react";
import App from "./App";

// These tests are meant to test that the app actually renders and contains the proper elements,
// rather than testing the functionality of the app itself.
describe("App", () => {

  // Basic fire test
  test("renders properly", () => {
    render(<App />);
    const title = screen.getByText(/boggle/i);
    expect(title).toBeInTheDocument();
  });

  // Test if the app contains 3 buttons for game control
  test("contains the proper buttons", () => {
    render(<App />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
  });

  // Test if the app contains the result 
  test("results header is present", () => {
    render(<App />);
    expect(screen.getByText("results")).toBeInTheDocument();
  });
});
