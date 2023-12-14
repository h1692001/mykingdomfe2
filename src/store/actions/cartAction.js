import actionTypes from './actionTypes';

export const fetchCart = (data) => {
  return {
    type: actionTypes.FETCH_CART,
    action: data,
  };
};
