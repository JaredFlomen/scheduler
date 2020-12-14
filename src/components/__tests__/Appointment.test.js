import React from 'react';
import { render } from '@testing-library/react';
import Application from 'components/Application';

describe('Appointment', () => {
  it('Renders without crashing', () => {
    render(<Application />);
  });
  //Commented it out as I wasn't sure we were supposed to run the tests

  // it('Does not call the function', () => {
  //   const fn = jest.fn();
  //   expect(fn).toHaveBeenCalledTimes(0);
  // });
  // it("calls the function", () => {
  //   const fn = jest.fn();
  //   fn();
  //   expect(fn).toHaveBeenCalledTimes(1);
  //  });
})
