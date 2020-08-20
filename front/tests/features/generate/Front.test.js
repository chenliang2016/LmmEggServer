import React from 'react';
import { shallow } from 'enzyme';
import { Front } from '../../../src/features/generate';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Front />);
  expect(renderedComponent.find('.generate-front').length).toBe(1);
});
