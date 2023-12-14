import actionTypes from '../actions/actionTypes';

const initState = {
  cart: {},
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART:
      return {
        ...state,
        cart: action.action,
      };
    default:
      return state;
  }
};

export default cartReducer;
