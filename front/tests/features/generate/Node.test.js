import React from 'react';
import { shallow } from 'enzyme';
import { Node } from '../../../src/features/generate';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Node />);
  expect(renderedComponent.find('.generate-node').length).toBe(1);
});
