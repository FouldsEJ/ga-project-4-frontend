import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '../styles/style.scss';

import Home from './Home';
import Navbar from './Navbar';
import Feed from './Feed';
import Connect from './Connect';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import Messenger from './Messenger';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/connect' element={<Connect />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/myprofile' element={<Profile />} />
      <Route path='/profile/:profileId' element={<Profile />} />
      <Route path='/messenger' element={<Messenger />} />
    </Routes>
  </BrowserRouter>
);

export default App;
