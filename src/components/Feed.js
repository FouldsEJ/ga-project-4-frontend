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
      <div className='border'>
        <h2>Create a Post</h2>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          placeholder='Title'
          className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4  place-items-center'
          onChange={handleNewPostChange}
          value={newPost.title}
        />
        <label htmlFor='text'>Text:</label>
        <input
          type='text'
          id='text'
          placeholder='Share your latest spikeball story!'
          className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
          onChange={handleNewPostChange}
          value={newPost.text}
        />
        <label htmlFor='image_url'>Image:</label>
        <button
          className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
          id='image_url'
          onClick={handleUpload}
        >
          Upload Image
        </button>
        <label htmlFor='video_url'>Video:</label>
        <button
          className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
          id='video_url'
          onClick={handleUpload}
        >
          Upload Video
        </button>
        <button
          className=' border text-blue-800 text-sm font-semibold rounded-2xl p-3 my-4 place-items-center'
          onClick={handlePost}
        >
          Post
        </button>
      </div>
      {posts.map((post) => (
        <FeedCard key={post.id} {...post} />
      ))}
    </>
  );
}

export default Feed;
