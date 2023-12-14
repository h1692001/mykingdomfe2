import axiosClients from '../AxiosClient';
const StatisticApi = {
  getDoanhThu: (startDate, endDate) => {
    const url = `/statistic/getDoanhThu?startDate=${startDate}&endDate=${endDate}`;
    return axiosClients.get(url);
  },
  getDonHang: (startDate, endDate) => {
    const url = `/statistic?startDate=${startDate}&endDate=${endDate}`;
    return axiosClients.get(url);
  },
};

export default StatisticApi;
