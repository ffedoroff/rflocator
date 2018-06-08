// params from querystring should be parsed and saved in exact order
const paramsOrder = ['coordId', 'offset', 'limit'];

// create new querystring string from parameters
export function getNewLocation(position) {
  if (position.selected) {
    const p = `/${position.selected.id}/${position.offset}/${position.limit}/`;
    if (p !== position.path) {
      return p;
    }
  }
  return undefined;
}

// parse params from querystring
export function getParamsFromPath(path) {
  const params = path.split('/').filter((v) => v !== '');
  const res = {};
  if (paramsOrder.length !== params.length) return undefined;
  for (let i = 0; i < paramsOrder.length; i += 1) {
    res[paramsOrder[i]] = Number(params[i]);
  }
  return res;
}
