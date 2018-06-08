import React from 'react';
import { shallow } from 'enzyme';
import ReactTestUtils from 'react-dom/test-utils';
import { IntlProvider } from 'react-intl';
import Table from '../index';
import TableHead from '../TableHead';

describe('<Table />', () => {
  let onCoordSelected = null;
  let onCoordHovered = null;
  let component = null;
  let renderedComponent = null;
  const data = [{
    id: 41,
    loc_lat: 51,
    loc_lon: 71,
    ups: 21,
    created: '123456',
    source: 'TIMER',
    loc_spd: 23,
  }, {
    id: 42,
    loc_lat: 52,
    loc_lon: 72,
    ups: 22,
    created: '123456',
    source: 'SLEEP',
    loc_spd: 0,
  }];
  const position = {
    offset: 2,
    limit: 9,
    selected: data[0],
  };

  beforeEach(() => {
    onCoordSelected = jest.fn();
    onCoordHovered = jest.fn();
    component = (
      <Table
        data={data}
        position={position}
        onCoordSelected={onCoordSelected}
        onCoordHovered={onCoordHovered}
      />
    );
    renderedComponent = shallow(component);
  });

  it('should render TileLayer', () => {
    expect(renderedComponent.find(TableHead).length).toBe(1);
  });

  it('should renderIntoDocument', () => {
    ReactTestUtils.renderIntoDocument(<IntlProvider locale="en">{component}</IntlProvider>);
  });

  it('should render hovered', () => {
    component = (
      <Table
        data={data}
        position={{ ...position, hovered: data[1] }}
        onCoordSelected={onCoordSelected}
        onCoordHovered={onCoordHovered}
      />
    );
    renderedComponent = shallow(component);
  });

  it('should call onCoordSelected properly', () => {
    expect(onCoordSelected).not.toHaveBeenCalled();
    renderedComponent.find('tr').last().props().onClick();
    expect(onCoordSelected).toHaveBeenCalledWith(data[1], position);
  });

  it('should call onMouseOver and onFocus properly', () => {
    expect(onCoordHovered).not.toHaveBeenCalled();

    renderedComponent.find('tr').last().props().onMouseOver();
    expect(onCoordHovered).toHaveBeenLastCalledWith(data[1]);

    renderedComponent.find('tr').first().props().onFocus();
    expect(onCoordHovered).toHaveBeenLastCalledWith(data[0]);
  });

  it('should call onMouseOut and onBlur properly', () => {
    expect(onCoordHovered).not.toHaveBeenCalled();

    renderedComponent.find('tr').last().props().onMouseOut();
    expect(onCoordHovered).toHaveBeenLastCalledWith(null);

    renderedComponent.find('tr').first().props().onBlur();
    expect(onCoordHovered).toHaveBeenLastCalledWith(null);
  });
});
