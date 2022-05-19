import React from 'react';
import { getAllUsers } from '../api/auth';
import { getLoggedInUserId } from '../lib/auth';
import { createRoom } from '../api/chats';

function NewChat({ newRoomInfo, setNewRoomInfo }) {
  const [allUsers, setAllUsers] = React.useState('');
  const [createChatShow, setCreateChatShow] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getAllUsers('', '');
        setAllUsers(userData);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  const handleCreateChatClick = () => {
    setCreateChatShow(!createChatShow);
  };

  const handleCreateClick = async () => {
    try {
      await createRoom(newRoomInfo);
      setCreateChatShow(!createChatShow);
      setNewRoomInfo({
        name: '',
        users: [getLoggedInUserId()],
        image: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMemberChange = (e, index) => {
    const arrayOfTargetValues = e.target.value.split(',');
    const temp_state = [...newRoomInfo.users];
    temp_state[index + 1] = parseInt(arrayOfTargetValues[0]);

    if (index === 0) {
      setNewRoomInfo({
        name: arrayOfTargetValues[1],
        image: arrayOfTargetValues[2],
        users: [...temp_state],
      });
    } else {
      setNewRoomInfo({
        name: 'Unnamed Chat',
        users: [...temp_state],
        image:
          'https://res.cloudinary.com/efoulds24/image/upload/v1652884187/default-room-image_dlqp1h.png',
      });
    }
  };

  function handleUpload(e) {
    console.log(e.target.id);
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
          setNewRoomInfo({
            ...newRoomInfo,
            [e.target.id]: result.info.secure_url,
          });
        }
      )
      .open();
  }

  const handleNewName = (e) => {
    setNewRoomInfo({ ...newRoomInfo, name: e.target.value });
  };

  if (!allUsers) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {!createChatShow && (
        <div>
          {newRoomInfo.users.map((userId, index) => (
            <div key={index} className='flex justify-center items-center m-2'>
              <label htmlFor='users' className='block px-3 font-bold'>
                Add a member:
              </label>
              <select
                name='users'
                defaultValue={''}
                className='w-1/2 px-2 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-black-500 '
                onChange={(e) => handleMemberChange(e, index)}
              >
                <option value='' disabled hidden>
                  Select your option
                </option>
                {allUsers.map((user) => (
                  <option
                    key={user.id}
                    id={user.id}
                    value={[user.id, user.username, user.image]}
                  >
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
          {newRoomInfo.users.length > 2 && (
            <div className='flex justify-center items-center'>
              <label htmlFor='name'>Group Name:</label>
              <input
                type='text'
                id='name'
                placeholder='Name'
                className='px-1 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 text-black-500'
                value={newRoomInfo.name}
                onChange={handleNewName}
              />
              <label htmlFor='image_url' className='ml-2'>
                Image:
              </label>
              <button
                className='px-2 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600'
                id='image'
                onClick={handleUpload}
              >
                Add Image
              </button>
            </div>
          )}
        </div>
      )}

      {createChatShow ? (
        <div className='flex justify-center'>
          <button
            className='rounded-2xl bg-bdazzled-blue-500 hover:bg-bdazzled-blue-700 font-bold p-3 my-4'
            onClick={handleCreateChatClick}
          >
            Create New Chat
          </button>
        </div>
      ) : (
        <div className='flex justify-center'>
          <button
            className='rounded-2xl bg-bdazzled-blue-500 hover:bg-bdazzled-blue-700  font-bold p-3 my-4'
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>
      )}
    </>
  );
}

export default NewChat;
