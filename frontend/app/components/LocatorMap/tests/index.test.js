import React from 'react';
import { shallow } from 'enzyme';
import { Marker, TileLayer } from 'react-leaflet';
import LocatorMap from '../index';

describe('<LocatorMap />', () => {
  let onCoordSelected = null;
  let onCoordHovered = null;
  let component = null;
  let renderedComponent = null;
  const data = [{
    id: 41,
    loc_lat: 51,
    loc_lon: 71,
  }, {
    id: 42,
    loc_lat: 52,
    loc_lon: 72,
  }, {
    id: 43,
    loc_lat: 53,
    loc_lon: 73,
  }];
  const position = {
    offset: 2,
    limit: 9,
    selected: data[1],
  };

  beforeEach(() => {
    onCoordSelected = jest.fn();
    onCoordHovered = jest.fn();
    component = (
      <LocatorMap
        tableVisible
        data={data}
        position={position}
        onCoordSelected={onCoordSelected}
        onCoordHovered={onCoordHovered}
      />
    );
    renderedComponent = shallow(component);
  });

  it('should render TileLayer', () => {
    expect(renderedComponent.find(TileLayer).length).toBe(1);
  });

  it('should render 3 Markers', () => {
    expect(renderedComponent.find(Marker).length).toBe(3);
  });

  // it('should render 1 Polyline', () => {
  //   expect(renderedComponent.find(Polyline).length).toBe(1);
  // });

  it('should render without tableVisible and hovered', () => {
    component = (
      <LocatorMap
        tableVisible={false}
        data={data}
        position={{ ...position, hovered: data[2] }}
        onCoordSelected={jest.fn()}
        onCoordHovered={jest.fn()}
      />
    );
    renderedComponent = shallow(component);
  });

  it('should call onCoordSelected properly', () => {
    expect(onCoordSelected).not.toHaveBeenCalled();
    renderedComponent.find(Marker).last().props().onClick();
    expect(onCoordSelected).toHaveBeenCalledWith(data[2], position);
  });

  it('should call onMouseOver and onFocus properly', () => {
    expect(onCoordHovered).not.toHaveBeenCalled();

    renderedComponent.find(Marker).last().props().onMouseOver();
    expect(onCoordHovered).toHaveBeenLastCalledWith(data[2]);

    renderedComponent.find(Marker).first().props().onFocus();
    expect(onCoordHovered).toHaveBeenLastCalledWith(data[0]);
  });

  it('should call onMouseOut and onBlur properly', () => {
    expect(onCoordHovered).not.toHaveBeenCalled();

    renderedComponent.find(Marker).last().props().onMouseOut();
    expect(onCoordHovered).toHaveBeenLastCalledWith(null);

    renderedComponent.find(Marker).first().props().onBlur();
    expect(onCoordHovered).toHaveBeenLastCalledWith(null);
  });
});
