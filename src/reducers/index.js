import login from './login';
import register from './register';
import userReducer from './userReduces';
import orderreducer from './OrderReducer';
import washHistory from './washhistoryreducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  login,
  register,
  userReducer,
  orderreducer,
  washHistory,
});
