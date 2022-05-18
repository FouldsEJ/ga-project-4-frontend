import axios from 'axios';
const baseUrl = `http://127.0.0.1:8000/`;
// const baseUrl = `https://spikesquad.herokuapp.com/`;

export const getAllUsers = async (username_search, user_id) => {
  console.log(username_search, user_id);
  const options = {
    method: 'GET',
    url: '',
  };

  if (!username_search) {
    options.url = `${baseUrl}authentication/allusers/?search=&userid=${user_id}`;
  } else {
    options.url = `${baseUrl}authentication/allusers/?search=${username_search}&userid=${user_id}`;
  }
  const { data } = await axios.request(options);
  return data;
};

export const getSingleUser = async () => {
  console.log('working');
  const options = {
    method: 'GET',
    url: `${baseUrl}authentication/credentials/`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}authentication/login/`,
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

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: `${baseUrl}authentication/register/`,
    data: user,
  };
  const { data } = await axios.request(options);

  return data;
};
