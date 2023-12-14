import axiosClients from '../AxiosClient';
const ProductApi = {
  getAllProduct: () => {
    const url = `/product`;
    return axiosClients.get(url);
  },
  search: (keyword) => {
    const url = `/product/search?keyword=${keyword}`;
    return axiosClients.get(url);
  },
  getBestSaleOff: () => {
    const url = `/product/getBestSaleOff`;
    return axiosClients.get(url);
  },
  getByCategory: (id) => {
    const url = `/product/getByCategory?categoryId=` + id;
    return axiosClients.get(url);
  },
  getByBrand: (id) => {
    const url = `/product/getByBrand?brandId=` + id;
    return axiosClients.get(url);
  },
  getById: (id) => {
    const url = `/product/getById?id=` + id;
    return axiosClients.get(url);
  },
  createProduct: (data) => {
    const url = '/product';
    return axiosClients.post(url, data);
  },
  update: (data) => {
    const url = '/product/updateProduct';
    return axiosClients.put(url, data);
  },
  voteProduct: (data) => {
    const url = '/product/voteProduct';
    return axiosClients.post(url, data);
  },
  addFavourite: (data) => {
    const url = '/product/addFavourite';
    return axiosClients.post(url, data);
  },
  removeFavourite: (data) => {
    const url = '/product/removeFavourite';
    return axiosClients.post(url, data);
  },
  getFavourite: (userId) => {
    const url = '/product/getAllFavourite?userId=' + userId;
    return axiosClients.get(url);
  },
  checkFavourite: (userId, productId) => {
    const url = '/product/checkFavourite?userId=' + userId + '&productId=' + productId;
    return axiosClients.get(url);
  },
};

export default ProductApi;
