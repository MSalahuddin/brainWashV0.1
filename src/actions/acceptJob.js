// @flow

import { ACCEPT_ORDER } from "./ActionTypes";

export function request(payload: Object) {
  return {
    payload,
    type: ACCEPT_ORDER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: ACCEPT_ORDER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: ACCEPT_ORDER.FAILURE
  };
}
