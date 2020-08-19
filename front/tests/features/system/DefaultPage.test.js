import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/system/DefaultPage';

describe('system/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      system: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.system-default-page').length
    ).toBe(1);
  });
});
