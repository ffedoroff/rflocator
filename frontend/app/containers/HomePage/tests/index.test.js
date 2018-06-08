/**
 * Test the HomePage
 */

import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import { IntlProvider } from 'react-intl';
import { HomePage, mapDispatchToProps } from '../index';

describe('<HomePage />', () => {
  let params = null;
  beforeEach(() => {
    const data = [
      {
        id: 21,
        created: '2017-11-20T08:16:53.639010Z',
        loc_lat: 55.04467321,
        loc_lon: 73.26924497,
        loc_acc: 11,
        loc_spd: 3.2882366,
        source: 'WAKE',
        ups: 11119764,
        batt: 100,
      }, {
        id: 22,
        created: '2017-11-20T08:16:52.769747Z',
        loc_lat: 55.04461327,
        loc_lon: 73.26922887,
        loc_acc: 10,
        loc_spd: 3.75,
        source: 'TIMER',
        ups: 11119762,
        batt: 100,
      }];
    params = {
      data,
      totalCount: 0,
      fetching: false,
      fetched: false,
      error: false,
      limitOptions: fromJS([5, 10]),
      tableVisible: false,
      position: {
        path: '/',
        offset: 0,
        limit: 5,
      },
      onCoordSelected: jest.fn(),
      onCoordHovered: jest.fn(),
      onTableVisibleToggle: jest.fn(),
      onFirstLoad: jest.fn(),
      onPerPageChange: jest.fn(),
      onOffsetDecrease: jest.fn(),
      onOffsetIncrease: jest.fn(),
      onOffsetReset: jest.fn(),
    };
  });

  it('mount HomePage without selected', () => {
    mount(
      <IntlProvider locale="en">
        <HomePage {...params} />
      </IntlProvider>
    );
    expect(params.onFirstLoad).toHaveBeenCalledTimes(1);
    expect(params.onCoordSelected).not.toHaveBeenCalled();
    expect(params.onCoordHovered).not.toHaveBeenCalled();
  });

  it('mount HomePage with selected', () => {
    params.position.selected = params.data[0];
    mount(
      <IntlProvider locale="en">
        <HomePage {...params} />
      </IntlProvider>
    );
    expect(params.onFirstLoad).toHaveBeenCalledTimes(1);
    expect(params.onCoordSelected).not.toHaveBeenCalled();
    expect(params.onCoordHovered).not.toHaveBeenCalled();
  });

  it('call each item in mapDispatchToProps', () => {
    const props = mapDispatchToProps(() => {});
    Object.entries(props).map((key) => key[1]()); // call each dispatch without parameters
  });
});
