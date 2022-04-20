import axios from 'axios';

export const getAllPosts = async () => {
  const options = {
    method: 'GET',
    url: 'http://127.0.0.1:8000/posts/',
  };
  const { data } = await axios.request(options);
  return data;
};
