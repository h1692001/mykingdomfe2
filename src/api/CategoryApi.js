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
};

export default CategoryApi;
