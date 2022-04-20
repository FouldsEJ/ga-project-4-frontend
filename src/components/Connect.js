import React from 'react';
import { getAllUsers } from '../api/auth';
import PlayerCard from './PlayerCard';

function Connect() {
  const [players, setPlayers] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const playersData = await getAllUsers();
        setPlayers(playersData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  if (!players) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {players.map((player) => (
          <PlayerCard key={player.username} {...player} />
        ))}
      </div>
    </>
  );
}

export default Connect;
