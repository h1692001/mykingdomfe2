import axiosClients from '../AxiosClient';
const CartApi = {
  getCart: (id) => {
    const url = `/cart?userId=` + id;
    return axiosClients.get(url);
  },
  deleteFromCart: (id) => {
    const url = `/cart?id=` + id;
    return axiosClients.delete(url);
  },
  deleteAllCart: (id) => {
    const url = `/cart/deleteAllCartItem?id=` + id;
    return axiosClients.delete(url);
  },
  addToCart: (data) => {
    const url = '/cart';
    return axiosClients.post(url, data);
  },
};

export default CartApi;
