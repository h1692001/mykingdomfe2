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
  updateBrand: (data) => {
    const url = '/brand';
    return axiosClients.put(url, data, {
      headers: {
        'content-type': 'form-data',
      },
    });
  },
  disablebrand: (data) => {
    const url = '/brand/disable?brandId=' + data;
    return axiosClients.get(url, data);
  },
  enablebrand: (data) => {
    const url = '/brand/enable?brandId=' + data;
    return axiosClients.get(url, data);
  },
};

export default BrandApi;
