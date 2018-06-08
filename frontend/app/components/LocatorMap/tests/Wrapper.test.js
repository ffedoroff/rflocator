import React from 'react';
import { shallow } from 'enzyme';
import StyledMap from '../Wrapper';

describe('<StyledMap />', () => {
  it('should render an <StyledMap> tag', () => {
    const renderedComponent = shallow(<StyledMap />);
    expect(renderedComponent.html()).toContain('div');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledMap />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledMap id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
});
