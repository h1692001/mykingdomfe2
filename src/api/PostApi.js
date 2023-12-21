import axiosClients from '../AxiosClient';
const PostApi = {
  createPost: (data) => {
    const url = `/post`;
    return axiosClients.post(url, data);
  },
  updatePost: (data) => {
    const url = `/post`;
    return axiosClients.put(url, data);
  },
  getAll: () => {
    const url = `/post`;
    return axiosClients.get(url);
  },
  getById: (id) => {
    const url = `/post/getById?id=${id}`;
    return axiosClients.get(url);
  },
  delete: (id) => {
    const url = `/post?postId=${id}`;
    return axiosClients.delete(url);
  },
};

export default PostApi;
