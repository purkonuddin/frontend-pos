import Axios from "axios";

// export const getAllProduct = () => {
//   return {
//     type: "GET_PRODUCT", // string yang mendiskripsikan perintah
//     payload: Axios.get("http://localhost:8080/api/product", {headers: {
//           "x-access-token": localStorage.getItem("token")
//         }})
//   };
// };

// export const getProducts = () => {
//   return {
//     type: "GET_PRODUCT",
//     payload: Axios.get("http://localhost:8080/api/product", {
//       headers: { "x-access-token": localStorage.usertoken }
//     })
//   };
// };

export const getProducts = () => {
  return {
    type: "GET_PRODUCT",
    payload: Axios.get(`${process.env.REACT_APP_URL_API}product`, {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};

export const pagingProducts = (page, per) => {
  return {
    type: "PAGING_PRODUCT",
    payload: Axios.get(`${process.env.REACT_APP_URL_API}pagination/products?page=${page}&limit=${per}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  };
};
