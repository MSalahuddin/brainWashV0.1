// @flow

import { WASHHISTORY } from "./ActionTypes";

export function request(payload: Object) {

  return {
    payload,
    type: WASHHISTORY.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: WASHHISTORY.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: WASHHISTORY.FAILURE
  };
}
