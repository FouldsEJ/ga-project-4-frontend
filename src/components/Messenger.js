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
    <div className='w-screen h-screen grid grid-cols-3 border-2 bg-gray-900 text-gray-200 '>
      <div className='col-span-1 overflow-auto'>
        <div className='bg-gray-700 py-3.5'>
          <input
            type='text'
            id='newchat'
            placeholder='Search Messages'
            className='m-auto w-9/12 text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 grid place-items-center'
            onChange={handleRoomSearch}
            value={roomSearch}
          />
          <NewChat newRoomInfo={newRoomInfo} setNewRoomInfo={setNewRoomInfo} />
        </div>
        {usersRooms.map((room) => (
          <div
            key={room.id}
            id={room.id}
            onClick={handleRoomClick}
            className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
          >
            <img
              className='w-16 h-16 shadow-md rounded-full object-cover'
              id={room.id}
              src={room.image}
              alt={room.name}
            />

            <p
              className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'
              id={room.id}
            >
              {room.name}
            </p>
          </div>
        ))}
      </div>

      {!currentRoomInfo ? (
        <p className='flex justify-center items-center col-span-2 border-l-2 '>
          Click on a chat to see the messages!
        </p>
      ) : (
        <div className='col-span-2 border-l-2 '>
          <div className='flex bg-gray-700 justify-center items-center py-3'>
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
                      <p className='px-6 py-3 max-w-md bg-blue-400 rounded-2xl'>
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
                      <p className=' px-6 py-3 max-w-md bg-green-400 rounded-2xl'>
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
              className='block w-9/12 text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4'
              onChange={handleNewMessage}
              value={newMessage.text}
            />
            <button
              className='rounded-2xl mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 my-4'
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
