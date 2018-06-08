import { fromJS } from 'immutable';

import {
  selectHome,
  makeSelectPosition,
  getPropsHomePage,
} from '../selectors';

describe('selectHome', () => {
  it('should select the home state', () => {
    const homeState = fromJS({
      limit: 5,
      data: [123, 456],
    });
    const mockedState = fromJS({
      home: homeState,
    });
    expect(selectHome(mockedState)).toEqual(homeState);
    expect(getPropsHomePage.data(mockedState)).toEqual(fromJS([123, 456]));
  });
});

describe('makeSelectPosition', () => {
  const positionSelector = makeSelectPosition();
  it('should select location pathname', () => {
    const pathname = '/35297/0/5/';
    const mockedState = fromJS({
      home: {
        offset: 25,
        limit: 5,
        selected: null,
        hovered: null,
      },
      route: {
        location: {
          pathname,
        },
      },
    });
    expect(positionSelector(mockedState)).toEqual({
      path: pathname,
      offset: 25,
      limit: 5,
      selected: null,
      hovered: null,
    });
  });
});

describe('getPropsHomePage', () => {
  it('should get getPropsHomePage', () => {
    expect(getPropsHomePage).toHaveProperty('position');
  });
});
