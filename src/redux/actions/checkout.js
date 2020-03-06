import Axios from "axios";

export const checkout = (bodyFormData, idUser, number) => {
  return {
    type: "CHECKOUT_ORDER",
    payload: Axios.post(
      `http://localhost:8080/api/order/order/${idUser}/${number}`,
      bodyFormData,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          "x-access-token": localStorage.usertoken
        }
      }
    )
  };
};

export const getCheckout = no_transaction => {
  return {
    type: "GET_CHECKOUT",
    payload: Axios.get(
      `http://localhost:8080/api/order/${no_transaction}`,
      {
        headers: { "x-access-token": localStorage.usertoken }
      }
    )
  };
};

// export const getCheckout = () => {
//   return {
//     type: "GET_CHECKOUT",
//     payload: Axios.get(process.env.REACT_APP_URL_API + `checkout`, {
//       headers: { "x-access-token": localStorage.usertoken }
//     })
//   };
// };
