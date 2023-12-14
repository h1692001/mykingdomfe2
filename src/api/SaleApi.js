import axiosClients from '../AxiosClient';
const SaleApi = {
  createSale: (data) => {
    const url = `/sale`;
    return axiosClients.post(url, data);
  },
  updateSale: (data) => {
    const url = `/sale`;
    return axiosClients.put(url, data);
  },
  getAll: () => {
    const url = `/sale`;
    return axiosClients.get(url);
  },
};

export default SaleApi;
