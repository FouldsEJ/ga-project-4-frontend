import React, { useState } from 'react';
import { createRoom } from '../api/chats';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth';
import { Link } from 'react-router-dom';

function PlayerCard({
  id,
  username,
  first_name,
  last_name,
  image,
  description,
  ability,
  gender,
  town,
  country,
}) {
  const newRoomDetails = {
    name: username,
    users: [getLoggedInUserId(), id],
    image: image,
  };

  const handleConnectClick = async (e) => {
    console.log('New room being created');
    try {
      await createRoom(newRoomDetails);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('id is:', id);

  return (
    <Link to={`/profile/${id}`}>
      <div className='flex items-center justify-center col-span-1 w-full h-full'>
        <div className='bg-bdazzled-blue-500 text-white-500 font-semibold text-center rounded-2xl border shadow-lg p-10 w-full  h-4/5 m-10'>
          <img
            className='mb-3 w-32 h-32 rounded-full shadow-lg mx-auto'
            src={image}
            alt={username}
          />
          <h1 className='text-lg font-bold'>{username}</h1>
          <h3 className='text-sm '>{ability}</h3>
          <p className='text-xs mt-4 h-8'> {description} </p>

          <button
            className='bg-polished-pine-500 hover:bg-polished-pine-700 px-8 py-2 mt-8 rounded-2xl font-semibold border-'
            onClick={handleConnectClick}
          >
            Connect
          </button>
        </div>
      </div>

      {/* 
      <div className='flex items-center justify-center bg-white'>

        <card className='flex flex-col items-center justify-center w-80 h-fit rounded-2xl border shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100'>
         
          <img
            src={image}
            alt={username}
            className='mb-3 w-32 h-32 rounded-full shadow-lg mx-auto'
          />
          <p className='text-3xl text-gray-700 font-semibold content-center'>
            {' '}
            {first_name} {last_name}{' '}
          </p>
          <p className='text-xl text-gray-700 font-semibold mt-1'>{gender}</p>
          <p className='text-sm text-gray-700 font-semibold mt-1'>{ability}</p>

          <p className='text-sm text-gray-700 font-light mt-5 leading-7'>
            {description}
          </p>

          <button className='mt-10 w-full py-3 rounded-xl border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-gray-50'>
            Connect
          </button>
        </card>
      </div> */}
    </Link>
  );
}

export default PlayerCard;
