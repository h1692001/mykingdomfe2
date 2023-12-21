import axiosClients from '../AxiosClient';
const CategoryApi = {
  getAllCategory: () => {
    const url = `/category`;
    return axiosClients.get(url);
  },
  createCategory: (data) => {
    const url = '/category';
    return axiosClients.post(url, data);
  },
  updateCategory: (data) => {
    const url = '/category';
    return axiosClients.put(url, data);
  },
  disableCategory: (data) => {
    const url = '/category/disable?categoryId=' + data;
    return axiosClients.get(url, data);
  },
  enableCategory: (data) => {
    const url = '/category/enable?categoryId=' + data;
    return axiosClients.get(url, data);
  },
};

export default CategoryApi;
