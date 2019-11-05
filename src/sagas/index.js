import login from "./login";
import register from "./register";
import order from './order';
import washHistory from './washhistory';

import { fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield fork(login);
  yield fork(register);
  yield fork(order);
  yield fork(washHistory);
}
