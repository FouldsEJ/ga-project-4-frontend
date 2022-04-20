import React from 'react';
import { getAllPosts } from '../api/posts';

function Feed() {
  const [posts, setPosts] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      const postData = await getAllPosts();
      setPosts(postData);
    };
    getData();
  }, []);

  console.log(posts);

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Feed Page </h1>
      {posts.map((post) => (
        <div>
          <h2>{post.title}</h2>
          <p>{post.text}</p>
          <img src={post.image_url} alt={post.title} />
        </div>
      ))}
    </>
  );
}

export default Feed;
