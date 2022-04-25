import React from 'react';
import { getAllPosts, createPost } from '../api/posts';
import { getLoggedInUserId } from '../lib/auth';
import FeedCard from './FeedCard';

const initialNewPost = {
  title: '',
  text: '',
  created_by: getLoggedInUserId(),
  image_url: '',
  video_url: '',
};

function Feed() {
  const [posts, setPosts] = React.useState('');
  const [newPost, setNewPost] = React.useState(initialNewPost);

  React.useEffect(() => {
    const getData = async () => {
      const postData = await getAllPosts();
      setPosts(postData);
    };
    getData();
  }, []);

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
      <section className='grid grid-cols-4'>
        <div className='border col-span-1 h-screen pt-10'>
          <h2 className='font-bold text-center'>Create Your Own Post</h2>
          <div className='flex flex-col justify-center'>
            <label htmlFor='title'></label>
            <input
              type='text'
              id='title'
              placeholder='Post Title '
              className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 m-2  place-items-center'
              onChange={handleNewPostChange}
              value={newPost.title}
            />
            <label htmlFor='text'></label>
            <textarea
              id='text'
              placeholder='Share your latest spikeball story here...'
              rows='10'
              columns='30'
              className='border text-blue-800 text-sm font-semibold rounded-2xl p-3 m-2 place-items-center resize-none'
              onChange={handleNewPostChange}
              value={newPost.text}
            />
          </div>
          <label htmlFor='image_url'></label>
          <div className='flex justify-evenly '>
            <button
              className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
              id='image_url'
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <label htmlFor='video_url'></label>
            <button
              className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
              id='video_url'
              onClick={handleUpload}
            >
              Upload Video
            </button>
          </div>
          <div className='flex justify-center'>
            <button
              className='rounded-2xl bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 my-4 content-center'
              onClick={handlePost}
            >
              Create Post
            </button>
          </div>
        </div>
        <div className='col-span-3'>
          {posts.map((post) => (
            <FeedCard key={post.id} {...post} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Feed;
