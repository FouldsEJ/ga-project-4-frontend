import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (getLoggedInUserId()) {
      navigate('/feed');
    } else {
      navigate('/signup');
    }
  };

  console.log('user id', getLoggedInUserId());
  return (
    <div className='hero mx-auto h-screen'>
      <h1 className='text-6xl text-white-500'>Ready, Set, Spike!!!</h1>
      <button
        className='bg-bdazzled-blue-500 hover:bg-bdazzled-blue-900 text-white-500 font-bold py-2 px-4 rounded border'
        onClick={handleButtonClick}
      >
        Join The SpikeSquad
      </button>
    </div>
  );
}

export default Home;
