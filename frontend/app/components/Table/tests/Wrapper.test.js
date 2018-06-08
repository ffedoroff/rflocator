import React from 'react';
import { shallow } from 'enzyme';
import StyledTable from '../Wrapper';

describe('<StyledTable />', () => {
  it('should render an <StyledTable> tag', () => {
    const renderedComponent = shallow(<StyledTable />);
    expect(renderedComponent.html()).toContain('table');
  });

  it('should have a className attribute', () => {
    const renderedComponent = shallow(<StyledTable />);
    expect(renderedComponent.prop('className')).toBeDefined();
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<StyledTable id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });
});
