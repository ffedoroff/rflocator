import { createSelector } from 'reselect';
export const selectHome = (state) => state.get('home');
const selectRoute = (state) => state.get('route');

export function sugarHome(param) {
  return () => createSelector(selectHome, (st) => st.get(param));
}

export const makeSelectPosition = () => createSelector(
  selectHome,
  selectRoute,
  (home, route) => ({
    path: route.get('location').toJS().pathname,
    offset: home.get('offset'),
    limit: home.get('limit'),
    selected: home.get('selected'),
    hovered: home.get('hovered'),
  })
);

export const getPropsHomePage = {
  data: sugarHome('data')(),
  totalCount: sugarHome('totalCount')(),
  fetching: sugarHome('fetching')(),
  fetched: sugarHome('fetched')(),
  error: sugarHome('error')(),
  limitOptions: sugarHome('limitOptions')(),
  tableVisible: sugarHome('tableVisible')(),
  position: makeSelectPosition(),
};
