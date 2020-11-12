import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/role/DefaultPage';

describe('role/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      role: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.role-default-page').length
    ).toBe(1);
  });
});
