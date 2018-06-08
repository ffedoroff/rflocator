/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  COORDS_OFFSET_DECREASE,
  COORDS_OFFSET_INCREASE,
  UI_TABLE_VISIBLE_TOGGLE,
  COORDS_OFFSET_RESET,
  COORDS_LIMIT_CHANGE,
  COORDS_HOVERED,
  COORDS_SELECTED,
  FIRST_LOAD,
} from './constants';
import { getParamsFromPath } from './customRoute';

function homeReducer(state = fromJS({
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
}), action) {
  switch (action.type) {
    case FIRST_LOAD: {
      const params = getParamsFromPath(action.payload);
      if (params) {
        return state
          .set('initialCoordId', params.coordId)
          .set('limit', params.limit)
          .set('offset', params.offset);
      }
      return state;
    }
    case LOAD_REPOS:
      return state
        .set('fetching', true)
        .set('error', false);
    case LOAD_REPOS_SUCCESS: {
      let selected = null;
      const results = action.data.results;
      if (action.data.count) {
        const initialCoordId = state.get('initialCoordId');
        if (initialCoordId) {
          selected = results.find((p) => p.id === initialCoordId);
        } else {
          selected = results[0];
        }
      }
      return state
        .set('initialCoordId', null)
        .set('selected', selected)
        .set('totalCount', action.data.count)
        .set('data', results)
        .set('fetched', true)
        .set('fetching', false);
    }
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('fetched', false)
        .set('fetching', false);
    case UI_TABLE_VISIBLE_TOGGLE: {
      return state
      .set('tableVisible', !state.get('tableVisible'));
    }
    case COORDS_OFFSET_DECREASE: {
      return state
      .set('offset', Math.max(0, state.get('offset') - state.get('limit')));
    }
    case COORDS_OFFSET_INCREASE: {
      return state
      .set('offset', Math.min(state.get('totalCount'), state.get('offset') + state.get('limit')));
    }
    case COORDS_OFFSET_RESET: {
      return state
      .set('offset', 0);
    }
    case COORDS_LIMIT_CHANGE: {
      return state
      .set('limit', action.payload);
    }
    case COORDS_HOVERED: {
      return state
      .set('hovered', action.payload);
    }
    case COORDS_SELECTED: {
      return state
      .set('selected', action.payload);
    }
    default:
      return state;
  }
}

export default homeReducer;
