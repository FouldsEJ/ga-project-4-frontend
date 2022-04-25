import React from 'react';
import { getAllUsers } from '../api/auth';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth';
import PlayerCard from './PlayerCard';

function Connect() {
  const [players, setPlayers] = React.useState('');
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const playersData = await getAllUsers(search, ''); //empty string added, as no userId needed in search
        setPlayers(playersData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(search);
  console.log('search');
  if (!players) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className='border flex justify-center items-center'>
        <label htmlFor='search'></label>
        <input
          type='text'
          id='search'
          placeholder='Search'
          className='border w-1/3 text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4  place-items-center'
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4'>
        {players.map(
          (player) =>
            player.id !== getLoggedInUserId() && (
              <PlayerCard key={player.username} {...player} />
            )
        )}
      </div>
    </>
  );
}

export default Connect;
