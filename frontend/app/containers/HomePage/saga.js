/**
 * Gets the repositories of the user from Github
 */

import request from 'utils/request';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { LOAD_REPOS } from './constants';
import { reposLoaded, repoLoadingError } from './actions';
import { makeSelectPosition } from './selectors';
import { getNewLocation } from './customRoute';

let APIPath = '';

if (process.env.NODE_ENV !== 'production') {
  APIPath = 'http://127.0.0.1:8000';
}

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  const position = yield select(makeSelectPosition());
  const requestURL = `${APIPath}/api/clientdata/?limit=${position.limit}&offset=${position.offset}&ordering=-created`;
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, position));

    // update url if need
    const newPosition = yield select(makeSelectPosition());
    const newLocation = getNewLocation(newPosition);
    if (newLocation) {
      yield put(replace(newLocation));
    }
  } catch (err) {
    yield put(repoLoadingError(err));
    window.location.href = `${APIPath}/admin/login/?next=/`;
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_REPOS, getRepos);
}
