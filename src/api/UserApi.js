import axiosClients from '../AxiosClient';
const UserApi = {
  getCurrentUser: (data) => {
    const url = `/user/getCurrentUser`;
    return axiosClients.get(url);
  },
  getAllNV: () => {
    const url = `/auth/getAllNV`;
    return axiosClients.get(url);
  },
  login: (data) => {
    console.log(3);
    const url = `/login`;
    return axiosClients.post(url, data);
  },
  signup: (data) => {
    const url = `/user/register`;
    return axiosClients.post(url, data);
  },
};

export default UserApi;
