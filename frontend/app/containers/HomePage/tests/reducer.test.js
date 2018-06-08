import { fromJS } from 'immutable';

import homeReducer from '../reducer';
import {
  COORDS_HOVERED, COORDS_LIMIT_CHANGE, COORDS_OFFSET_DECREASE, COORDS_OFFSET_INCREASE, COORDS_OFFSET_RESET,
  COORDS_SELECTED, FIRST_LOAD, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS, UI_TABLE_VISIBLE_TOGGLE,
} from '../constants';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      data: null,
      totalCount: 0,
      fetching: false,
      fetched: false,
      error: false,
      hovered: null,
      selected: null,
      offset: 0,
      limit: 5,
      limitOptions: [5, 10, 20, 50, 100, 200],
      tableVisible: true,
    });
  });

  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual(state);
  });

  it('should handle the COORDS_OFFSET_INCREASE action for empty state', () => {
    expect(homeReducer(state, { type: COORDS_OFFSET_INCREASE })).toEqual(state);
  });

  it('should handle the COORDS_OFFSET_DECREASE action for empty state', () => {
    expect(homeReducer(state, { type: COORDS_OFFSET_DECREASE })).toEqual(state);
  });

  it('should handle the COORDS_OFFSET_INCREASE action for non-empty 142 state', () => {
    const newState = state.set('totalCount', 142);
    const expectedState = newState.set('offset', 5);
    expect(homeReducer(newState, { type: COORDS_OFFSET_INCREASE })).toEqual(expectedState);
  });

  it('should handle the COORDS_OFFSET_INCREASE action for non-empty 4 state', () => {
    const newState = state.set('totalCount', 4);
    const expectedState = newState.set('offset', 4);
    expect(homeReducer(newState, { type: COORDS_OFFSET_INCREASE })).toEqual(expectedState);
  });

  it('should handle the COORDS_OFFSET_RESET action for empty state', () => {
    state = state.set('offset', 2);
    expect(state.get('offset')).toEqual(2);
    expect(homeReducer(state, { type: COORDS_OFFSET_RESET }).get('offset')).toEqual(0);
  });

  it('should handle the LOAD_REPOS action for empty state', () => {
    expect(state.get('fetching')).toEqual(false);
    expect(homeReducer(state, { type: LOAD_REPOS }).get('fetching')).toEqual(true);
  });

  it('should handle the LOAD_REPOS_SUCCESS action', () => {
    expect(state.get('selected')).toEqual(null);
    expect(homeReducer(state, {
      type: LOAD_REPOS_SUCCESS,
      data: { count: 2, results: [{ id: 22 }, { id: 77 }] },
    }).get('selected')).toEqual({ id: 22 });
    expect(homeReducer(state.set('initialCoordId', 77), {
      type: LOAD_REPOS_SUCCESS,
      data: { count: 2, results: [{ id: 22 }, { id: 77 }] },
    }).get('selected')).toEqual({ id: 77 });
    expect(homeReducer(state, {
      type: LOAD_REPOS_SUCCESS,
      data: { count: 0, results: [] },
    }).get('selected')).toEqual(null);
  });

  it('should handle the LOAD_REPOS_ERROR action', () => {
    expect(state.get('error')).toEqual(false);
    expect(homeReducer(state, { type: LOAD_REPOS_ERROR, error: 478 }).get('error')).toEqual(478);
  });

  it('should handle the UI_TABLE_VISIBLE_TOGGLE action for empty state', () => {
    expect(state.get('tableVisible')).toEqual(true);
    expect(homeReducer(state, { type: UI_TABLE_VISIBLE_TOGGLE }).get('tableVisible')).toEqual(false);
  });

  it('should handle the COORDS_LIMIT_CHANGE action', () => {
    expect(state.get('limit')).toEqual(5);
    expect(homeReducer(state, { type: COORDS_LIMIT_CHANGE, payload: 25 }).get('limit')).toEqual(25);
  });

  it('should handle the COORDS_HOVERED action', () => {
    expect(state.get('hovered')).toEqual(null);
    expect(homeReducer(state, { type: COORDS_HOVERED, payload: 99 }).get('hovered')).toEqual(99);
  });

  it('should handle the COORDS_SELECTED action', () => {
    expect(state.get('selected')).toEqual(null);
    expect(homeReducer(state, { type: COORDS_SELECTED, payload: 99 }).get('selected')).toEqual(99);
  });

  it('should handle the FIRST_LOAD action', () => {
    expect(state.get('initialCoordId')).toEqual(undefined);
    expect(homeReducer(state, { type: FIRST_LOAD, payload: '/123/45/67' }).get('initialCoordId')).toEqual(123);
  });
});
