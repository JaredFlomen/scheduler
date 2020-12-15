import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByAltText, getByPlaceholderText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe('Application', () => {
  it("Defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it('Loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0]
    fireEvent.click(getByAltText(appointment, 'Add'))
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'))
    fireEvent.click(getByText(appointment, 'Save'));
    console.log(prettyDOM(appointment))
  })
})

