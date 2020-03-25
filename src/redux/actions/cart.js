// import Axios from "axios";

// export const getUserCart = (id_user) => {
//   console.log('id user :',id_user)
//   return {
//     type: "GET_CART", // string yang mendiskripsikan perintah
//     payload: Axios.get(`http://localhost:8080/api/order/card/${id_user}`, {headers: {
//           "x-access-token": localStorage.getItem("usertoken")
//         }})
//   };
// };

// export const postUserCart = (item) => {
//   let id_barang = item.id_barang;
//   let id_user = item.id_user;
//   return {
//     type: "POST_CART",
//     payload: Axios.post(`http://localhost:8080/api/order/order/${idUser}/${number}`,{id_user:id_user, id_barang:id_barang}, {headers: {
//       "x-access-token": localStorage.getItem("usertoken")
//     }})
//   };
// };
