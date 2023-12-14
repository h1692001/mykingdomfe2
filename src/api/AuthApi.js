import axiosClients from '../AxiosClient';
const AuthApi = {
  register: (data) => {
    const url = `/auth/register`;
    return axiosClients.post(url, data);
  },
  registerNV: (data) => {
    const url = `/auth/registerNV`;
    return axiosClients.post(url, data);
  },
};

export default AuthApi;
