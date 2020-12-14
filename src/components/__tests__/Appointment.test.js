import React from 'react';
import { render } from '@testing-library/react';
import Application from 'components/Application';

it('Renders without crashing', () => {
  render(<Application />);
});