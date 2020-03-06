import Axios from "axios";

export const getAllProduct = () => {
  return {
    type: "GET_PRODUCT", // string yang mendiskripsikan perintah
    payload: Axios.get("http://localhost:8080/api/product", {headers: {
          "x-access-token": localStorage.getItem("token")
        }})
  };
};

export const getProducts = () => {
  return {
    type: "GET_PRODUCT",
    payload: Axios.get("http://localhost:8080/api/product", {
      headers: { "x-access-token": localStorage.usertoken }
    })
  };
};
