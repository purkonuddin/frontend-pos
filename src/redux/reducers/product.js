const initialValue = {
  productData: [],
  errMsg: [],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const productReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_PRODUCT_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_PRODUCT_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_PRODUCT_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        productData: action.payload.data.result
      };
    
    default:
      return state;
  }
};

export default productReducer;
