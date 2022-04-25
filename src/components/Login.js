import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserId } from '../lib/auth';

function Login() {
  const [loginData, setLoginData] = React.useState('');
  const [responseError, setResponseError] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const { data } = await loginUser(loginData);
        navigate(`/profile/${getLoggedInUserId()}`);
      } catch (err) {
        console.error(err);
        setResponseError(err.response.data.message);
      }
    };
    getData();
  };

  console.log(loginData);
  return (
    <>
      <div className='herologin grid place-items-center h-screen'>
        <form className='p-8 text-left rounded-2xl bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3'>
          <div className='flex justify-center'>
            <i className='fa-solid fa-volleyball'></i>
            <h1 className='text-2xl font-bold text-center'>SpikeSquad</h1>
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='username'
            >
              Email
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              onChange={handleChange}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </div>
          <p className='text-xs text-red-400 mb-3'>{responseError}</p>

          <button
            className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>

      {/* <h1>Login</h1>
      <Container maxWidth='sm'>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            id='email'
            placeholder='email'
            onChange={handleChange}
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            placeholder='password'
            onChange={handleChange}
          />
          <input type='submit' value='Submit' onClick={handleSubmit} />
        </div>
      </Container> */}
    </>
  );
}

export default Login;
