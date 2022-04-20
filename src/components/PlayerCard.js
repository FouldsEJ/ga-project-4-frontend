import React from 'react';

function PlayerCard({
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
  return (
    <>
      <div class='flex items-center justify-center '>
        <div class='bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs'>
          <img
            class='mb-3 w-32 h-32 rounded-full shadow-lg mx-auto'
            src={image}
            alt='product designer'
          />
          <h1 class='text-lg text-gray-700'>{first_name}</h1>
          <h3 class='text-sm text-gray-400 '>{ability}</h3>
          <p class='text-xs text-gray-400 mt-4'> {description} </p>
          <button class='bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide'>
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
    </>
  );
}

export default PlayerCard;
