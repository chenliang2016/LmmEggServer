import React from 'react';
import { shallow } from 'enzyme';
import { AddListPage } from '../../../src/features/system';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<AddListPage />);
  expect(renderedComponent.find('.system-add-list-page').length).toBe(1);
});
