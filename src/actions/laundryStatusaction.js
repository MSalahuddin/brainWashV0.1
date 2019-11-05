// @flow

import { LAUNDARYSTATUS } from "./ActionTypes";

export function request(payload: Object) {

  return {
    payload,
    type: LAUNDARYSTATUS.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: LAUNDARYSTATUS.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: LAUNDARYSTATUS.FAILURE
  };
}
