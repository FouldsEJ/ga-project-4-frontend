import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/signup');
  };

  return (
    <div className='hero mx-auto h-screen'>
      <h1 className='text-6xl text-white'>Ready, Set, Spike!!!</h1>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleButtonClick}
      >
        Join The SpikeSquad
      </button>
    </div>
  );
}

export default Home;
