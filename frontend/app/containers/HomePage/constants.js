/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/Home/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/Home/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/Home/LOAD_REPOS_ERROR';
export const COORDS_OFFSET_DECREASE = 'boilerplate/Home/COORDS_OFFSET_DECREASE';
export const COORDS_OFFSET_INCREASE = 'boilerplate/Home/COORDS_OFFSET_INCREASE';
export const UI_TABLE_VISIBLE_TOGGLE = 'boilerplate/Home/UI_TABLE_VISIBLE_TOGGLE';
export const COORDS_OFFSET_RESET = 'boilerplate/Home/COORDS_OFFSET_RESET';
export const COORDS_LIMIT_CHANGE = 'boilerplate/Home/COORDS_LIMIT_CHANGE';
export const COORDS_HOVERED = 'boilerplate/Home/COORDS_HOVERED';
export const COORDS_SELECTED = 'boilerplate/Home/COORDS_SELECTED';
export const FIRST_LOAD = 'boilerplate/Home/FIRST_LOAD';
