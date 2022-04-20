import axios from 'axios';

export const getAllUsers = async () => {
  const options = {
    method: 'GET',
    url: 'http://127.0.0.1:8000/authentication/credentials/',
  };
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
