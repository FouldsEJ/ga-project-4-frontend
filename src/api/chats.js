import axios from 'axios';

export const getChatsByRoom = async (roomid) => {
  const options = {
    method: 'GET',
    url: `http://127.0.0.1:8000/chats/?roomid=${roomid}`,
  };
  const { data } = await axios.request(options);

  return data;
};
