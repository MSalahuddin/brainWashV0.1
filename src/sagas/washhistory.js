import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../services/apiSauce';
import {Washhistory_Api} from '../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/WashHistoryAction';

import {ErrorHelper} from '../helpers';
function callRequest(data) {
  return ApiSauce.get(Washhistory_Api, data);
}
let a = 1;
function* watchRequest() {
  while (true) {
    a++;
    const {payload} = yield take(types.WASHHISTORY.REQUEST);
    // const { targetView } = payload;
    // delete payload.targetView;
    try {
      const response = yield call(callRequest, payload);

      yield put(success(response));
      // setTimeout(() => {
      //   Actions.verify({
      //     phoneNumber: JSON.stringify(payload.phoneNumber).replace(/\"/g, ""),
      //     targetView: targetView,

      //     title: strings("navtitles.otp")
      //   });
      // }, 800);
    } catch (err) {
      console.log(err);
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
