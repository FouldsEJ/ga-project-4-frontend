import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <header>
        <nav className='bg-bdazzled-blue-500 border-b text-white-500'>
          <div className='px-5 flex items-center justify-between h-12'>
            <div className='flex items-baseline space-x-4'>
              <Link
                to=''
                className=' hover:bg-spike-yellow-900  px-3 py-2 rounded-md text-sm font-medium'
              >
                <i className='fa-solid fa-volleyball'></i>SpikeSquad
              </Link>

              {getLoggedInUserId() && (
                <>
                  <Link
                    to='/feed'
                    className='text-gray-300 hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Feed
                  </Link>

                  <Link
                    to='/connect'
                    className='text-gray-300 hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Connect
                  </Link>
                </>
              )}
            </div>

            <div className='flex items-baseline space-x-4'>
              {getLoggedInUserId() && (
                <>
                  <Link
                    to='/messenger'
                    className='text-gray-300 hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Messages
                  </Link>

                  <Link
                    to={`/profile/${getLoggedInUserId()}`}
                    className='text-gray-300 hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    My Profile
                  </Link>

                  <button
                    className='text-gray-300 hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}

              {!getLoggedInUserId() && (
                <>
                  <Link
                    to='/login'
                    className='hover:bg-spike-yellow-900 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    Login
                  </Link>
                  <Link
                    to='/signup'
                    className=' hover:bg-spike-yellow-900  px-3 py-2 rounded-md text-sm font-medium'
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        </div>
      </header> */}
    </>
  );
}

export default Navbar;
