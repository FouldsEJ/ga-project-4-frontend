import React from 'react';
import { getAllUsers } from '../api/auth';
import { getLoggedInUserId } from '../lib/auth';

function NewChat() {
  const [newChatInfo, setNewChatInfo] = React.useState({
    name: '',
    users: [getLoggedInUserId()],
    image: '',
  });
  const [allUsers, setAllUsers] = React.useState('');
  // const [numberOfMembers, setNumberOfMembers] = React.useState(1);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getAllUsers('');
        setAllUsers(userData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  // const handleAddClick = () => {
  //   setNumberOfMembers(numberOfMembers + 1);
  // };

  const handleMemberChange = (e, index) => {
    // if (newChatInfo.users.length === 1) {
    //   console.log('THIS is Working');
    //   const oldArray = newChatInfo.users;
    //   console.log('Old array:', oldArray);
    //   oldArray.push(e.target.id);
    //   setNewChatInfo({
    //     ...newChatInfo,
    //     name: e.target.value,
    //     image: e.target.image,
    //     users: oldArray,
    //   });
    // }

    setNewChatInfo({
      ...newChatInfo,
      users: [...newChatInfo.users, parseInt(e.target.value)],
    });
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

  console.log('allUsers', allUsers);
  console.log('newChatInfo', newChatInfo);
  console.log('newChatInfo Users length', newChatInfo.users.length);
  if (!allUsers) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className='flex justify-center'>
        <button className='rounded-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 my-4'>
          New Individual Chat
        </button>
        <button className='rounded-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 my-4'>
          New Group Chat
        </button>
      </div>

      {newChatInfo.users.map((user, index) => (
        <div key={index} className='flex justify-center items-center'>
          <label htmlFor='users' className='block mt-3'>
            Add a member:
          </label>
          <select
            id='users'
            name='users'
            value=''
            defaultValue={''}
            className='w-1/2 px-2 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
            onChange={(e) => handleMemberChange(e, index)}
          >
            <option value='' disabled hidden>
              Select your option
            </option>
            {allUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          {/* <button
            className='ml-10 rounded bg-blue-500 hover:bg-blue-700 text-white font-bold px-2'
            onClick={handleAddClick}
          >
            +
          </button> */}
        </div>
      ))}
      <div className='flex justify-center items-center'>
        <label htmlFor='name'>Group Name:</label>
        <input
          type='text'
          id='name'
          placeholder='Name'
          className='px-1 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
        />
        <label htmlFor='image_url' className='ml-2'>
          Image:
        </label>
        <button
          className='px-2 py-1 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
          id='image'
          onClick={handleUpload}
        >
          Add Image
        </button>
      </div>
    </>
  );
}

export default NewChat;
