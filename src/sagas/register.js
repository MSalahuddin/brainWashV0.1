import { take, put, call, fork } from "redux-saga/effects";
// import { Actions } from "react-native-router-flux";
import ApiSauce from "../services/apiSauce";
import * as types from "../actions/ActionTypes";
import { success, failure } from "../actions/RegisterAction";
import { register_Api } from "../config/WebServices";
import { ErrorHelper } from "../helpers";
// import { strings } from "../I18n";

function callRequest(data){
  return ApiSauce.post(register_Api,data);
}
// ​function callRequest(data) {
//   return ApiSauce.post(register_Api,data);
// }
function* watchRequest() {
  while (true) {
    const { payload } = yield take(types.REGISTER.REQUEST);
    console.log(payload, "sssssssvvvvvvvsssssskkkkkkkkkkkkk");
    try {
      const response = yield call(callRequest, payload);
      yield put(success(response));
      console.log(response);
      //   setTimeout(() => {
      //     Actions.verify({
      //       phoneNumber: JSON.stringify(payload.phoneNumber).replace(/\"/g, ""),
      //       targetView: targetView,

      //       title: strings("navtitles.otp")
      //     });
      //   }, 800);
    } catch (err) {
      console.log(err)
      yield put(failure(err));
      ErrorHelper.handleErrors(err, true);
    }
  }
}

export default function* root(){
  yield fork(watchRequest);
}