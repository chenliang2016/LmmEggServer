import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/generate/DefaultPage';

describe('generate/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      generate: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.generate-default-page').length
    ).toBe(1);
  });
});
