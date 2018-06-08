import {
  COORDS_HOVERED, COORDS_LIMIT_CHANGE, COORDS_OFFSET_DECREASE, COORDS_OFFSET_INCREASE, COORDS_OFFSET_RESET,
  COORDS_SELECTED, LOAD_REPOS, LOAD_REPOS_ERROR, LOAD_REPOS_SUCCESS, UI_TABLE_VISIBLE_TOGGLE,
} from '../constants';
import {
  loadRepos, onCoordHovered, onCoordSelected, onOffsetDecrease, onOffsetIncrease, onOffsetReset, onPerPageChange,
  onTableVisibleToggle, repoLoadingError, reposLoaded,
} from '../actions';

describe('App Actions', () => {
  it('loadRepos', () => {
    const realResult = [];
    loadRepos()((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: LOAD_REPOS });
  });

  it('should return the correct type and the passed repos', () => {
    const data = ['Test'];
    const position = 'test';
    const expectedResult = {
      type: LOAD_REPOS_SUCCESS,
      data,
      position,
    };
    expect(reposLoaded(data, position)).toEqual(expectedResult);
  });

  it('repoLoadingError', () => {
    const fixture = { msg: 'Something went wrong!' };
    const expectedResult = { type: LOAD_REPOS_ERROR, error: fixture };
    expect(repoLoadingError(fixture)).toEqual(expectedResult);
  });

  it('onCoordHovered', () => {
    const realResult = [];
    onCoordHovered(123)((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_HOVERED, payload: 123 });
  });

  it('onCoordSelected', () => {
    const realResult = [];
    const position = {
      path: 'fake-path',
      offset: 25,
      limit: 5,
      selected: { id: 123 },
      hovered: null,
    };
    onCoordSelected(123, position)((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_SELECTED, payload: 123 });
  });

  it('onPerPageChange', () => {
    const realResult = [];
    onPerPageChange(123)((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_LIMIT_CHANGE, payload: 123 });
  });

  it('onOffsetDecrease', () => {
    const realResult = [];
    onOffsetDecrease()((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_OFFSET_DECREASE });
  });

  it('onOffsetIncrease', () => {
    const realResult = [];
    onOffsetIncrease()((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_OFFSET_INCREASE });
  });

  it('onOffsetReset', () => {
    const realResult = [];
    onOffsetReset()((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: COORDS_OFFSET_RESET });
  });

  it('onTableVisibleToggle', () => {
    const realResult = [];
    onTableVisibleToggle()((param) => realResult.push(param)); // eslint-disable-line no-return-assign
    expect(realResult[0]).toEqual({ type: UI_TABLE_VISIBLE_TOGGLE });
  });
});
