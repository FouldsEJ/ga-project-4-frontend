import axios from 'axios';

export const createRoom = async (newRoom) => {
  console.log('newchat data: ', newRoom);
  const options = {
    method: 'POST',
    url: `http://127.0.0.1:8000/rooms/`,
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
    url: `http://127.0.0.1:8000/chats/?roomid=${roomid}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const createChat = async (newChat) => {
  console.log('newchat data: ', newChat);
  const options = {
    method: 'POST',
    url: `http://127.0.0.1:8000/chats/`,
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
    url: `http://127.0.0.1:8000/rooms/?userid=${userid}&search=${roomname}`,
  };
  const { data } = await axios.request(options);
  console.log('Here:', data);

  return data;
};

export const getRoomById = async (id) => {
  const options = {
    method: 'GET',
    url: `http://127.0.0.1:8000/rooms/${id}/`,
  };
  const { data } = await axios.request(options);

  return data;
};
