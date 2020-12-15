import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it.skip("Defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it('Loads data, books an interview and reduces the spots remaining for the first day by 1', () => {
    const { container } = render(<Application />);
    console.log(prettyDOM(container))
  })
})

