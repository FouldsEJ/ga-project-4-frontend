import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <header>
        <nav className='bg-gray-800'>
          <div className='px-5 flex items-center justify-between h-12'>
            <div className='flex items-baseline space-x-4'>
              <Link
                to=''
                className=' hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                SpikeSquad
              </Link>

              <Link
                to='/feed'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Feed
              </Link>

              <Link
                to='/connect'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Connect
              </Link>
            </div>
            <div className='flex items-baseline space-x-4'>
              <Link
                to='/login'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                Login
              </Link>

              <Link
                to='/signup'
                className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
              >
                SignUp
              </Link>
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
