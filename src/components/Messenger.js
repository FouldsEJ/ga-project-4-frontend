import React from 'react';
import { getChatsByRoom, createChat } from '../api/chats';
import { getLoggedInUserId } from '../lib/auth';

function Messenger({ id, rooms }) {
  const [currentRoom, setCurrentRoom] = React.useState('');
  const [roomSearch, setRoomSearch] = React.useState('');
  const [chats, setChats] = React.useState('');
  const [newMessage, setNewMessage] = React.useState({
    text: '',
    room_id: currentRoom,
    created_by: id,
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getChatsByRoom(currentRoom);
        setChats(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [currentRoom]);

  const handleRoomSearch = (e) => {
    setRoomSearch(e.target.value);
  };

  const handleRoomClick = (e) => {
    console.log(e.target.id);
    setCurrentRoom(e.target.id);
    setNewMessage({ ...newMessage, room_id: e.target.id });
  };

  const handleNewMessage = (e) => {
    setNewMessage({ ...newMessage, text: e.target.value });
  };

  const handleNewMessageSubmit = async (e) => {
    try {
      await createChat(newMessage);
      setNewMessage({ ...newMessage, text: '' });
    } catch (err) {
      console.error(err);
    }
  };

  console.log('Room search', roomSearch);

  if (!rooms) {
    return <p>Loading...</p>;
  }
  console.log('Room:', currentRoom);
  return (
    <div className='w-full h-full grid grid-cols-3 border-2 bg-gray-900 text-gray-200'>
      <div className='col-span-1'>
        <input
          type='text'
          id='newchat'
          placeholder='Search'
          className='m-auto w-9/12 text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 grid place-items-center'
          onChange={handleRoomSearch}
          value={roomSearch}
        />
        {rooms.map((room) => (
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
              alt='User2'
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

      {!currentRoom ? (
        <p className='flex justify-center items-center col-span-2 border-l-2'>
          Click on a chat to see the messages!
        </p>
      ) : (
        <div className='col-span-2 border-l-2'>
          <div className='flex bg-green-700 '>
            <img
              src={currentRoom.image}
              alt={currentRoom.name}
              className='h-16 w-16 rounded-full z-10'
            />
            <h2>{currentRoom.name}</h2>
          </div>
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

          <div className='flex justify-around'>
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
