import axiosClients from '../AxiosClient';
const BrandApi = {
  getAllBrand: () => {
    const url = `/brand`;
    return axiosClients.get(url);
  },
  createBrand: (data) => {
    const url = '/brand';
    return axiosClients.post(url, data, {
      headers: {
        'content-type': 'form-data',
      },
    });
  },
};

export default BrandApi;
