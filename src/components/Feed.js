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
      {posts.map((post) => (
        <FeedCard key={post.id} {...post} />
      ))}
    </>
  );
}

export default Feed;
