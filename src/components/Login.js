import React from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loginData, setLoginData] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const { data } = await loginUser(loginData);
        navigate('/profile');
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };

  console.log(loginData);
  return (
    <>
      <div className='herologin grid place-items-center h-screen'>
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
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
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Password'
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
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
