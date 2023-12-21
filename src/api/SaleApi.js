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
  delete: (id) => {
    const url = `/sale?saleId=${id}`;
    return axiosClients.delete(url);
  },
};

export default SaleApi;
