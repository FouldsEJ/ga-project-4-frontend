import axios from 'axios';

export const getAllUsers = async () => {
  const options = {
    method: 'GET',
    url: 'http://127.0.0.1:8000/authentication/allusers/',
  };
  const { data } = await axios.request(options);
  return data;
};

export const getSingleUser = async (id) => {
  const options = {
    method: 'GET',
    url: `http://127.0.0.1:8000/authentication/credentials/${id}`,
  };
  const { data } = await axios.request(options);
  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: 'http://127.0.0.1:8000/authentication/login/',
    data: credentials,
  };
  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }

  return data.message;
};
