import {take, put, call, fork} from 'redux-saga/effects';
// import { Actions } from "react-native-router-flux";
import ApiSauce from '../services/apiSauce';
import * as types from '../actions/ActionTypes';
import {success, failure} from '../actions/acceptJob';
import {Accept_order} from '../config/WebServices';
import {ErrorHelper} from '../helpers';
// import { strings } from "../I18n";

function callRequest(data) {
  let token = data.access_token;
//   console.log('token', token);
  let payload = {
    user_id: data.user_id,
    order_id: data.order_id
  };
//   console.log("paylllllllllllll",payload)
  return ApiSauce.postWithToken(Accept_order, payload, token);
}
// ​function callRequest(data) {
//   return ApiSauce.post(order_request,data);
// }
// let a = 1;
function* watchRequest() {
  while (true) {
    // a++;
    const {payload} = yield take(types.ACCEPT_ORDER.REQUEST);
    // console.log(payload, 'sssssssvvvvvvvsssssskkkkkkkkkkkkk');
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response));
      console.log('oreder====>', response);
      //   setTimeout(() => {
      //     Actions.verify({
      //       phoneNumber: JSON.stringify(payload.phoneNumber).replace(/\"/g, ""),
      //       targetView: targetView,

      //       title: strings("navtitles.otp")
      //     });
      //   }, 800);
    } catch (err) {
      console.log('errrrrrrrrrr', err);
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
