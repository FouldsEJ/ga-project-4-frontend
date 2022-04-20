import React from 'react';
import { loginUser } from '../api/auth';
import Container from '@mui/material/Container';

function Login() {
  const [loginData, setLoginData] = React.useState('');

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getData = async () => {
      try {
        const { data } = await loginUser(loginData);
        // sessionStorage.setItem('accessToken', data.token);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  };

  console.log(loginData);
  return (
    <>
      <h1>Login</h1>
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
      </Container>
    </>
  );
}

export default Login;
