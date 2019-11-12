import login from './login';
import register from './register';
import order from './order';
import washHistory from './washhistory';
import editProfile from './editprofile';
import getorder from './getOrder';
import acceptorder from './acceptOrder'
import {fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield fork(login);
  yield fork(register);
  yield fork(order);
  yield fork(washHistory);
  yield fork(editProfile);
  yield fork(getorder);
  yield fork(acceptorder);
}
