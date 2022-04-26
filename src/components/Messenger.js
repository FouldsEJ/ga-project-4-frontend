import React from 'react';
import {
  getChatsByRoom,
  createChat,
  getRoomById,
  getAllRoomsForUser,
} from '../api/chats';
import { getLoggedInUserId } from '../lib/auth';
import NewChat from './NewChat';

function Messenger() {
  const userId = getLoggedInUserId();
  const [currentRoomId, setCurrentRoomId] = React.useState('');
  const [currentRoomInfo, setCurrentRoomInfo] = React.useState('');
  const [usersRooms, setUsersRooms] = React.useState('');
  const [roomSearch, setRoomSearch] = React.useState('');
  const [chats, setChats] = React.useState('');
  const [newMessage, setNewMessage] = React.useState({
    text: '',
    room_id: currentRoomId,
    created_by: userId,
  });
  const [newRoomInfo, setNewRoomInfo] = React.useState({
    name: '',
    users: [getLoggedInUserId()],
    image: '',
  });
  const [render, setRender] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const usersRoomsData = await getAllRoomsForUser(userId, roomSearch);
        setUsersRooms(usersRoomsData);

        if (currentRoomId) {
          const chatData = await getChatsByRoom(currentRoomId);
          const currentRoomData = await getRoomById(currentRoomId);
          setChats(chatData);
          setCurrentRoomInfo(currentRoomData);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [currentRoomId, roomSearch, newRoomInfo, render]);

  const handleRoomSearch = (e) => {
    setRoomSearch(e.target.value);
  };

  const handleRoomClick = (e) => {
    setCurrentRoomId(e.target.id);
    setNewMessage({ ...newMessage, room_id: e.target.id });
  };

  const handleNewMessage = (e) => {
    setNewMessage({ ...newMessage, text: e.target.value });
  };

  const handleNewMessageSubmit = async (e) => {
    try {
      await createChat(newMessage);
      setNewMessage({ ...newMessage, text: '' });
      setRender(!render);
    } catch (err) {
      console.error(err);
    }
  };

  if (!usersRooms) {
    return <p>Loading...</p>;
  }
  return (
    <div className='w-screen h-screen grid grid-cols-3 border-2 bg-polished-pine-900 text-white-500'>
      <div className='col-span-1 h-full w-full'>
        <div className='bg-polished-pine-500 py-3.5 h-min border-b-2 '>
          <input
            type='text'
            id='newchat'
            placeholder='Search Messages'
            className='m-auto w-9/12 text-black-500 text-sm font-semibold rounded-2xl p-3 my-4 grid place-items-center'
            onChange={handleRoomSearch}
            value={roomSearch}
          />
          <NewChat newRoomInfo={newRoomInfo} setNewRoomInfo={setNewRoomInfo} />
        </div>
        <div className='h-max overflow-auto '>
          {usersRooms.map((room) => (
            <div
              key={room.id}
              id={room.id}
              onClick={handleRoomClick}
              className='flex justify-between items-center p-3 hover:bg-polished-pine-500 rounded-lg relative'
            >
              <img
                className='w-16 h-16 shadow-md rounded-full object-cover'
                id={room.id}
                src={room.image}
                alt={room.name}
              />
              <p
                className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block font-bold'
                id={room.id}
              >
                {room.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {!currentRoomInfo ? (
        <p className='flex justify-center items-center col-span-2 border-l-2 '>
          Click on a chat to see the messages!
        </p>
      ) : (
        <div className='col-span-2 border-l-2 '>
          <div className='flex bg-polished-pine-500 justify-center items-center py-3 border-b-2 '>
            <img
              src={currentRoomInfo.image}
              alt={currentRoomInfo.name}
              className='h-20 w-20 rounded-full mx-5'
            />
            <h2 className='text-2xl'>{currentRoomInfo.name}</h2>
          </div>

          <div className='overflow-auto'>
            {chats &&
              chats.map((chat) => (
                <div key={chat.id}>
                  {chat.created_by.id === getLoggedInUserId() ? (
                    <div className='mt-2 flex justify-end'>
                      <p className='px-6 py-3 max-w-md bg-steel-blue-900 rounded-2xl text-bdazzled-blue-800'>
                        {chat.text}
                      </p>
                    </div>
                  ) : (
                    <div className='mt-2 flex justify-start'>
                      <img
                        src={chat.created_by.image}
                        alt={chat.created_by.username}
                        className='rounded-full h-12 w-12 mr-2'
                      />
                      <p className=' px-6 py-3 max-w-md bg-spike-yellow-400 rounded-2xl text-bdazzled-blue-800'>
                        {chat.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>

          <div className='flex justify-around items-end '>
            <input
              type='text'
              id='newchat'
              placeholder='Aa'
              className='block w-9/12 text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 text-black-500'
              onChange={handleNewMessage}
              value={newMessage.text}
            />
            <button
              className='rounded-2xl mr-10 bg-bdazzled-blue-500 hover:bg-bdazzled-blue-700 font-bold p-3 my-4'
              onClick={handleNewMessageSubmit}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messenger;
