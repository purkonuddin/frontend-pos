//Menggabungkan beberapa reducer menjadi 1 fungsi reducer
//Menggunakan CombineReducers
// import { combineReducers } from "redux";
// // import countReducer from "./count";
// import userReducer from "./user";
//
// const reducers = combineReducers({
//   // count: countReducer,
//   user: userReducer
// });

// export default reducers;
import { combineReducers } from 'redux'
// import user from "./user";
import checkout from "./checkout";
// import cart from './cart'
import product from './product'

export default combineReducers({
  // user,
  // cart,
  product,
  checkout
})