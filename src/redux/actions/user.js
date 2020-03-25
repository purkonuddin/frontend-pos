// import Axios from "axios";

// export const loginUser = (user) => {
//   return {
//     type: "LOGIN_USER",
//     payload: Axios.post("http://localhost:8080/api/user/login", {
//       id: user.username,
//       password: user.password
//     })
//   };
// };

// export const getAllUser = () => {
//   return {
//     type: "GET_USER", // string yang mendiskripsikan perintah
//     payload: Axios.get("http://localhost:8080/api/user")
//   };
// };

// export const postNewUser = name => {
//   return {
//     type: "POST_USER",
//     payload: Axios.post(process.env.REACT_APP_URL_STRING, {
//       username: name
//     })
//   };
// };
