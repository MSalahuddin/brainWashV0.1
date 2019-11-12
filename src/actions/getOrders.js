// @flow

import { GET_ORDER } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: GET_ORDER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: GET_ORDER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: GET_ORDER.FAILURE
  };
}
