import React from 'react';
import { getLoggedInUserId } from '../lib/auth';
import { getAllUsers } from '../api/auth';
import { useParams } from 'react-router-dom';

function Profile() {
  const { profileId } = useParams();
  const [user, setUser] = React.useState('');

  console.log('id:', profileId);
  console.log('logged in user:', getLoggedInUserId());
  console.log(parseInt(profileId) === getLoggedInUserId());

  React.useEffect(() => {
    const getData = async () => {
      try {
        const [data] = await getAllUsers('', profileId);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  console.log(user);
  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <section className='h-screen w-screen flex p-10 justify-center bg-steel-blue-500 text-white-500'>
      <div className='w-full md:w-3/12 md:mx-2'>
        <div className='bg-bdazzled-blue-500 rounded-2xl p-3'>
          <div className='image overflow-hidden'>
            <img
              className='h-auto w-full mx-auto rounded-full'
              src={user.image}
              alt=''
            />
          </div>
          <h1 className='font-bold text-xl my-1'>{user.first_name}</h1>
          <h3 className='font-lg text-semibold'>{user.ability}</h3>
          <p className='text-sm '>{user.description}</p>
          <div className='bg-polished-pine-300  py-2 px-3 mt-3 divide-y rounded-2xl shadow-sm'>
            <div className='flex items-center py-3'>
              <h3>Status</h3>
              <span className='ml-auto bg-polished-pine-900 py-1 px-2 rounded text-white text-sm'>
                Active
              </span>
            </div>
            <div className='flex items-center py-3'>
              <h3>Member since</h3>
              <p className='ml-auto'>{user.date_joined}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full md:w-9/12 mx-5 h-64 mt-10 bg-polished-pine-300 p-3 shadow-lg rounded-2xl'>
        <h1 className='text-center font-bold text-4xl mb-10'>About</h1>

        <div className='grid md:grid-cols-2 text-sm'>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>First Name</p>
            <p className='px-4 py-2'>{user.first_name}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Last Name</p>
            <p className='px-4 py-2'>{user.last_name}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Gender</p>
            <p className='px-4 py-2'>{user.gender}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Ability</p>
            <p className='px-4 py-2'>{user.ability}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Town</p>
            <p className='px-4 py-2'>{user.town}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Country</p>
            <p className='px-4 py-2'>{user.country}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Email.</p>
            <p className='px-4 py-2'>{user.email}</p>
          </div>
          <div className='grid grid-cols-2'>
            <p className='px-4 py-2 font-semibold'>Birthday</p>
            <p className='px-4 py-2'>{user.birthday}</p>
          </div>
        </div>

        {/* {getLoggedInUserId() === parseInt(profileId) && (
              <button className='block w-6/12 m-auto text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 p-3 my-4'>
                Edit Information
              </button>
            )} */}
      </div>
    </section>
  );
}

export default Profile;
