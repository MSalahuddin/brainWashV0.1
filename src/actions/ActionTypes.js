// @flow
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";
const CANCEL = "CANCEL";

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
  // [REQUEST].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const LOGIN = createRequestTypes("LOGIN");
export const LOGOUT = "LOGOUT";
export const REGISTER = createRequestTypes("REGISTER");
export const ORDER = createRequestTypes("ORDER");
export const WASHHISTORY = createRequestTypes("WASHHISTORY");
export const LAUNDARYSTATUS = createRequestTypes("LAUNDARYSTATUS");
export const EDITPROFILE = createRequestTypes("EDITPROFILE");
export const GET_PROFILE = createRequestTypes("GET_PROFILE");
export const DRAWAR_MENU_SWITCHED = "DRAWAR_MENU_SWITCHED";


