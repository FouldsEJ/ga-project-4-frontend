import React from 'react';
import { getAllPosts } from '../api/posts';
import FeedCard from './FeedCard';

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
        <FeedCard key={post.id} {...post} />
      ))}
    </>
  );
}

export default Feed;
