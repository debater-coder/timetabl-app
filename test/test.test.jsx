import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Nav from "../components/Nav";
import { act } from "react-dom/test-utils";

test("Test Render", async () => {
  act(() => {
    render(<Nav />);
  });
  expect(screen.getByText(/Timetabl/i)).toBeInTheDocument();
});
