import React from 'react';
import { getAllPosts, createPost } from '../api/posts';
import { getLoggedInUserId } from '../lib/auth';
import FeedCard from './FeedCard';

const initialNewPost = {
  title: '',
  text: '',
  created_by: getLoggedInUserId(),
  created_datetime: new Date(),
  image_url: '',
  video_url: '',
};

function Feed() {
  const [posts, setPosts] = React.useState('');
  const [newPost, setNewPost] = React.useState(initialNewPost);
  const [renderDelete, setRenderDelete] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      const postData = await getAllPosts();
      setPosts(postData);
    };
    getData();
  }, [newPost, renderDelete]);

  function handleNewPostChange(e) {
    setNewPost({ ...newPost, [e.target.id]: e.target.value });
  }

  function handleUpload(e) {
    e.preventDefault();
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: process.env.CLOUD_NAME,
          uploadPreset: process.env.UPLOAD_PRESET,
          cropping: true,
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setNewPost({
            ...newPost,
            [e.target.id]: result.info.secure_url,
          });
        }
      )
      .open();
  }

  async function handlePost() {
    try {
      await createPost(newPost);
      setNewPost(initialNewPost);
    } catch (err) {
      console.error(err);
    }
  }

  console.log(newPost);

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className='grid grid-cols-4 bg-steel-blue-500'>
        <div className='border-r border-white-500 col-span-1 h-full pt-10 bg-bdazzled-blue-500 text-white-500'>
          <h2 className='font-bold text-center'>Create Your Own Post</h2>
          <div className='flex flex-col justify-center'>
            <label htmlFor='title'></label>
            <input
              type='text'
              id='title'
              placeholder='Post Title '
              className=' border text-sm font-semibold rounded-2xl p-3 m-2  place-items-center text-black-500'
              onChange={handleNewPostChange}
              value={newPost.title}
            />
            <label htmlFor='text'></label>
            <textarea
              id='text'
              placeholder='Share your latest spikeball story here...'
              rows='10'
              columns='30'
              className='border text-black-500 text-sm font-semibold rounded-2xl p-3 m-2 place-items-center resize-none'
              onChange={handleNewPostChange}
              value={newPost.text}
            />
          </div>
          <label htmlFor='image_url'></label>
          <div className='flex justify-evenly '>
            <button
              className=' text-white-500 bg-polished-pine-500 hover:bg-polished-pine-700  text-xs font-semibold rounded-2xl p-3 my-2 ml-10 place-items-center'
              id='image_url'
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <label htmlFor='video_url'></label>
            <button
              className=' text-white-500 bg-polished-pine-500 hover:bg-polished-pine-700 text-xs font-semibold rounded-2xl p-1 my-2 mr-10 place-items-center'
              id='video_url'
              onClick={handleUpload}
            >
              Upload Video
            </button>
          </div>
          <div className='flex justify-center'>
            <button
              className='rounded-2xl text-white-500 bg-polished-pine-500 hover:bg-polished-pine-700 font-bold p-4 my-4 content-center'
              onClick={handlePost}
            >
              Create Post
            </button>
          </div>
        </div>
        <div className='col-span-3'>
          {posts.map((post) => (
            <FeedCard
              key={post.id}
              {...post}
              renderDelete={renderDelete}
              setRenderDelete={setRenderDelete}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Feed;
