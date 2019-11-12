import login from './login';
import register from './register';
import userReducer from './userReduces';
import orderreducer from './OrderReducer';
import washHistory from './washhistoryreducer';
import editProfile from './editprofilereducer';
import getorder from './getOrderReducer';
import acceptorder from './acceprOrderReducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  login,
  register,
  userReducer,
  orderreducer,
  washHistory,
  editProfile,
  getorder,
  acceptorder
});
