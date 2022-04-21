import { getChipUtilityClass } from '@mui/material';
import React from 'react';
import { getChatsByRoom } from '../api/chats';

function Messenger({ rooms }) {
  const [room, setRoom] = React.useState('');
  const [chats, setChats] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const data = await getChatsByRoom(room);
        setChats(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [room]);

  const handleRoomClick = (e) => {
    console.log(e.target.id);
    setRoom(e.target.id);
  };

  if (!rooms) {
    return <p>Loading...</p>;
  }
  return (
    <div className='w-full grid grid-cols-3 border-2 bg-gray-900 text-gray-200'>
      <div className='col-span-1'>
        {rooms.map((room) => (
          <div
            key={room.id}
            id={room.id}
            onClick={handleRoomClick}
            className='flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative'
          >
            <div className='w-16 h-16 relative flex flex-shrink-0'>
              <img
                className='shadow-md rounded-full w-full h-full object-cover'
                src={room.image}
                alt='User2'
              />
            </div>
            <div className='flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block'>
              <p>{room.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='col-span-2 border-l-2'>
        <h1>Messages</h1>
        {chats && chats.map((chat) => <p>{chat.text}</p>)}
      </div>
    </div>
  );
}

export default Messenger;
