import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { render } from 'enzyme';
import { fromJS } from 'immutable';
import Pagination from '../index';

describe('<Pagination />', () => {
  // let onFetchCoords = null;
  let onPerPageChange = null;
  let component = null;
  let renderedComponent = null;

  beforeEach(() => {
    // onFetchCoords = jest.fn();
    onPerPageChange = jest.fn();
    component = (
      <Pagination
        fetching={false}
        totalCount={123}
        limitOptions={fromJS([5, 10, 11, 12])}
        position={{
          offset: 2,
          limit: 9,
          selected: {
            id: 44,
            loc_lat: 55,
            loc_lon: 77,
          },
          hovered: {
            id: 41,
            loc_lat: 51,
            loc_lon: 71,
          },
        }}
        onTableVisibleToggle={jest.fn()}
        // onFetchCoords={onFetchCoords}
        onPerPageChange={onPerPageChange}
        onOffsetDecrease={jest.fn()}
        onOffsetIncrease={jest.fn()}
        onOffsetReset={jest.fn()}
      />
    );
    renderedComponent = render(component);
  });

  it('should render 2 divs', () => {
    expect(renderedComponent.find('div').length).toBe(2);
  });

  it('should render 4 options', () => {
    expect(renderedComponent.find('option').length).toBe(4);
  });

  // it('should call onFetchCoords', () => {
  //   expect(onFetchCoords).toHaveBeenCalledTimes(1);
  //   expect(onPerPageChange).not.toHaveBeenCalled();
  // });

  it('should call onChange properly', () => {
    expect(renderedComponent.find('select').length).toBe(1);
    const select = ReactTestUtils.findRenderedDOMComponentWithTag(
      ReactTestUtils.renderIntoDocument(component), 'select');
    expect(onPerPageChange).not.toHaveBeenCalled();
    ReactTestUtils.Simulate.change(select);
    expect(onPerPageChange).toHaveBeenCalledWith(5);
  });
});
