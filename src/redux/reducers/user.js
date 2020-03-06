const initialValue = {
  user:[],
  userData: [],
  errMsg: [],
  msg:[],
  isPending: false,
  isRejected: false,
  isFulfilled: false
};

const userReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "LOGIN_USER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "LOGIN_USER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "LOGIN_USER_FULFILLED":
      localStorage.setItem("usertoken", action.payload.data.token);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        user: action.payload
      };
    case "GET_USER_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };
    case "GET_USER_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload.data
      };
    case "GET_USER_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        userData: action.payload.data.result
      };

    default:
      return state;
  }
};

export default userReducer;
