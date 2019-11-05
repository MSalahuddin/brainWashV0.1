// @flow

import { ORDER } from "./ActionTypes";

export function request(payload: Object) {
  console.log('55555555555555555555555666666666666666666666666777777777777777777')
  return {
    payload,
    type: ORDER.REQUEST
  };
}

export function success(data: Object) {
  return {
    data,
    type: ORDER.SUCCESS
  };
}

export function failure(errorMessage: Object) {
  return {
    errorMessage,
    type: ORDER.FAILURE
  };
}
