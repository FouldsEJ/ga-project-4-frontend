import React from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formInput, setFormInput] = React.useState({ rooms: [] });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formInput);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  function handleUpload(e) {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.CLOUD_NAME}`,
          uploadPreset: `${process.env.UPLOAD_PRESET}`,
          cropping: true,
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setFormInput({
            ...formInput,
            [e.target.id]: result.info.secure_url,
          });
        }
      )
      .open();
  }

  console.log(formInput);
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 herosignup'>
      <div className='px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3'>
        <div className='flex justify-center'>
          <i className='fa-solid fa-volleyball'></i>
          <h1 className='text-2xl font-bold text-center'>SpikeSquad</h1>
        </div>
        <h3 className='text-2xl font-bold text-center'>Join us</h3>
        <form action=''>
          <div className='flex'>
            <div>
              <label className='block mt-4' htmlFor='first_name'>
                First Name
              </label>
              <input
                type='text'
                id='first_name'
                placeholder='First Name'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label className='block mt-4' htmlFor='last_name'>
                Last Name
              </label>
              <input
                type='text'
                id='last_name'
                placeholder='Last Name'
                className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                onChange={handleFormChange}
              />
            </div>
          </div>
          <label className='block mt-4' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            placeholder='Username'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />
          <label className='block mt-4' htmlFor='description'>
            Description
          </label>
          <input
            type='text'
            id='description'
            placeholder='Tell us about you and your spikeball life!'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />

          <label className='block mt-4' htmlFor='gender'>
            Gender
          </label>
          <select
            id='gender'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            defaultValue={''}
            onChange={handleFormChange}
          >
            <option value='' disabled hidden>
              Select your option
            </option>
            <option value='male'>MALE</option>
            <option value='female'>FEMALE</option>
            <option value='non-binary'>NON-BINARY</option>
            <option value='transgender'>TRANSGENDER</option>
            <option value='i prefer not to say'>I PREFER NOT TO SAY</option>
          </select>

          <label className='block mt-4' htmlFor='gender'>
            Ability
          </label>
          <select
            id='ability'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
            defaultValue={''}
          >
            <option value='' disabled hidden>
              Select your option
            </option>
            <option value='beginner'>BEGINNER</option>
            <option value='intermediate'>INTERMEDIATE</option>
            <option value='advanced'>ADVANCED</option>
            <option value='world class'>WORLD CLASS</option>
          </select>

          {/* <label className='block mt-4'>Town</label>
          <input
            type='text'
            id='town'
            placeholder='Town'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />
          <label className='block mt-4'>Country</label>
          <input
            type='text'
            id='country'
            placeholder='Country'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          /> */}

          <label htmlFor='image_url'>Image:</label>
          <button
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            id='image'
            onClick={handleUpload}
          >
            Upload Image
          </button>

          <label className='block mt-4' htmlFor='email'>
            Email
          </label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />

          <label className='block mt-4'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />

          <label className='block mt-4'>Confirm Password</label>
          <input
            type='password'
            id='password_confirmation'
            placeholder='Password'
            className='w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={handleFormChange}
          />

          <span className='text-xs text-red-400'>Password must be same!</span>

          <button
            className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900'
            onClick={handleFormSubmit}
          >
            Create Account
          </button>

          <p className='mt-6 text-grey-dark'>
            Already have an account?
            <a className='text-blue-600 hover:underline' href='/login'>
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
