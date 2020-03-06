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
import user from "./user";
import checkout from "./checkout";
import cart from './cart'
import product from './product'

export default combineReducers({
  user,
  cart,
  product,
  checkout
})

// const getAddedIds = state => fromCart.getAddedIds(state.cart)
// const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
// const getProduct = (state, id) => fromProducts.getProduct(state.products, id)

// export const getTotal = state =>
//   getAddedIds(state)
//     .reduce((total, id) =>
//       total + getProduct(state, id).price * getQuantity(state, id),
//       0
//     )
//     .toFixed(2)

// export const getCartProducts = state =>
//   getAddedIds(state).map(id => ({
//     ...getProduct(state, id),
//     quantity: getQuantity(state, id)
//   }))
