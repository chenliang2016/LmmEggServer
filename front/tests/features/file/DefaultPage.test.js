import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/file/DefaultPage';

describe('file/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      fileManager: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.file-default-page').length
    ).toBe(1);
  });
});
