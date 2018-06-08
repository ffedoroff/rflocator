/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import { replace } from 'react-router-redux';

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
import { getNewLocation } from './customRoute';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return (dispatch) => {
    dispatch({ type: LOAD_REPOS });
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} data coordinates data
 * @param  {array} position
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(data, position) {
  return {
    type: LOAD_REPOS_SUCCESS,
    data,
    position,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function onCoordHovered(item) {
  return (dispatch) => {
    dispatch({ type: COORDS_HOVERED, payload: item });
  };
}

export function onCoordSelected(item, position) {
  return (dispatch) => {
    dispatch({ type: COORDS_SELECTED, payload: item });
    const newLocation = getNewLocation({ ...position, selected: item });
    if (newLocation) {
      dispatch(replace(newLocation));
    }
  };
}

export function onFirstLoad(path) {
  return (dispatch) => {
    dispatch({ type: FIRST_LOAD, payload: path });
    loadRepos()(dispatch);
  };
}

export function onPerPageChange(newLimit) {
  return (dispatch) => {
    dispatch({ type: COORDS_LIMIT_CHANGE, payload: newLimit });
    loadRepos()(dispatch);
  };
}

export function onOffsetDecrease() {
  return (dispatch) => {
    dispatch({ type: COORDS_OFFSET_DECREASE });
    loadRepos()(dispatch);
  };
}

export function onOffsetIncrease() {
  return (dispatch) => {
    dispatch({ type: COORDS_OFFSET_INCREASE });
    loadRepos()(dispatch);
  };
}

export function onOffsetReset() {
  return (dispatch) => {
    dispatch({ type: COORDS_OFFSET_RESET });
    loadRepos()(dispatch);
  };
}

export function onTableVisibleToggle() {
  return (dispatch) => {
    dispatch({ type: UI_TABLE_VISIBLE_TOGGLE });
  };
}
