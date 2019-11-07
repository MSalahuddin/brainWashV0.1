import {take, put, call, fork} from 'redux-saga/effects';

import ApiSauce from '../services/apiSauce';
import {Editprofile_Api} from '../config/WebServices';
import * as types from '../actions/ActionTypes';

import {success, failure} from '../actions/EditProfileAction';

import {ErrorHelper} from '../helpers';
function callRequest(data) {
  console.log('ye raha data', data);
  let setData = new FormData();
  setData.append('bio', data.payload.bio);
  setData.append('graduation', data.payload.graduation);
  setData.append('id', data.payload.id);
  setData.append('image', data.payload.image);
  setData.append('name', data.payload.name);
  return ApiSauce.postWithTokenMultipart(Editprofile_Api, setData, data.token);
}
// let a = 1;
function* watchRequest() {
  while (true) {
    const {payload} = yield take(types.EDITPROFILE.REQUEST);
    try {
      const response = yield call(callRequest, payload);
      // console.log(response);
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
