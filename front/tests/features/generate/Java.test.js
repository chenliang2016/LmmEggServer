import React from 'react';
import { shallow } from 'enzyme';
import { Java } from '../../../src/features/generate';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Java />);
  expect(renderedComponent.find('.generate-java').length).toBe(1);
});
