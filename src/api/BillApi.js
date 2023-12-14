import axiosClients from '../AxiosClient';
const BillApi = {
  getAllBill: () => {
    const url = `/product/getAllBill`;
    return axiosClients.get(url);
  },
  getAllBillByUserId: (id) => {
    const url = `/product/getAllBillByUserId?userId=` + id;
    return axiosClients.get(url);
  },
  createBill: (data) => {
    const url = '/bill';
    return axiosClients.post(url, data);
  },
  createBillVNPAY: (data) => {
    const url = `/vnpay/create-payment?amount=${data}`;
    return axiosClients.get(url);
  },
  changeStatusBill: (data) => {
    const url = '/product/changeStatusBill';
    return axiosClients.put(url, data);
  },
};

export default BillApi;
