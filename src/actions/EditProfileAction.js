// @flow

import { EDITPROFILE } from "./ActionTypes";

export function request(payload: Object) {

  return {
    payload,
    type: EDITPROFILE.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: EDITPROFILE.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: EDITPROFILE.FAILURE
  };
}
