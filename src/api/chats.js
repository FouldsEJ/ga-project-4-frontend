import axios from 'axios';

const baseUrl = `http://127.0.0.1:8000/`;
// const baseUrl = `https://spikesquad.herokuapp.com/`;

export const createRoom = async (newRoom) => {
  console.log('newchat data: ', newRoom);
  const options = {
    method: 'POST',
    url: `${baseUrl}rooms/`,
    data: newRoom,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};

export const getChatsByRoom = async (roomid) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}chats/?roomid=${roomid}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const createChat = async (newChat) => {
  console.log('newchat data: ', newChat);
  const options = {
    method: 'POST',
    url: `${baseUrl}chats/`,
    data: newChat,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};

export const getAllRoomsForUser = async (userid, roomname) => {
  console.log('getAllusersroom');
  const options = {
    method: 'GET',
    url: `${baseUrl}rooms/?userid=${userid}&search=${roomname}`,
  };
  const { data } = await axios.request(options);
  console.log('Here:', data);

  return data;
};

export const getRoomById = async (id) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}rooms/${id}/`,
  };
  const { data } = await axios.request(options);

  return data;
};
