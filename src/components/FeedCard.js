import React from 'react';
import { getLoggedInUserId } from '../lib/auth';
import {
  createComment,
  addLike,
  deleteLike,
  deletePost,
  getCommentsByPost,
  getLikesByPost,
} from '../api/posts';

function FeedCard({
  title,
  id,
  image_url,
  video_url,
  text,
  created_by,
  created_datetime,
  renderDelete,
  setRenderDelete,
}) {
  const [likes, setLikes] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [render, setRender] = React.useState(false);
  const [newComment, setNewComment] = React.useState({
    text: '',
    post_id: id,
    created_by: getLoggedInUserId(),
  });

  const [actionsCompleted, setAcionsCompleted] = React.useState({
    liked: false,
    viewingComments: false,
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        const commentsData = await getCommentsByPost(id);
        const likesData = await getLikesByPost(id);
        setComments(commentsData);
        setLikes(likesData);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [render]);

  const handleViewComments = () => {
    setAcionsCompleted({
      ...actionsCompleted,
      viewingComments: !actionsCompleted.viewingComments,
    });
  };

  const handleAddLike = async () => {
    const alreadyLiked = likes.filter(
      (like) => like.created_by === getLoggedInUserId()
    );

    console.log('already liked: ', alreadyLiked);

    try {
      if (alreadyLiked.length === 0) {
        console.log('adding like');
        await addLike(newComment);
      } else {
        console.log('deleting like');
        await deleteLike(alreadyLiked[0].id);
      }
      setRender(!render);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCommentClick = () => {
    setAcionsCompleted({
      ...actionsCompleted,
      viewingComments: true,
    });
  };

  const handleNewCommentChange = (e) => {
    setNewComment({ ...newComment, text: e.target.value });
  };

  const handleNewCommentSubmit = async (e) => {
    try {
      await createComment(newComment);
      setNewComment({ ...newComment, text: '' });
      setRender(!render);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = async (e) => {
    try {
      await deletePost(id);
      setRenderDelete(!renderDelete);
    } catch (err) {
      console.error(err);
    }
  };

  console.log('likes', likes);
  let x = likes.includes(created_by === getLoggedInUserId());
  console.log(x);

  if (!comments || !likes) {
    return <p>Loading...</p>;
  }
  return (
    <div className='container m-auto my-10'>
      <div className='w-8/12 m-auto border-2 border-b-4 border-gray-200 rounded-xl'>
        <div className='grid grid-cols-6 p-5 gap-y-2'>
          <div>
            <img src={created_by.image} className='w-16 h-16 rounded-full' />
          </div>
          <div className='col-span-5 md:col-span-4 ml-4'>
            <p className='text-gray-600 font-bold'> {created_by.username} </p>
            <p className='text-sky-500 font-bold text-xs'>
              {' '}
              {created_by.ability}
            </p>

            <p className='text-gray-400'> {created_datetime} </p>
          </div>
          <div className='flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end'>
            <button
              className='rounded-lg text-sky-500 font-bold bg-sky-100  py-1 px-3 text-sm w-fit h-fit'
              onClick={handleDeletePost}
            >
              Delete
            </button>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <h2 className='font-semibold'>{title}</h2>
          <p className='mr-auto px-5'>{text}</p>
          {image_url && (
            <img
              src={image_url}
              alt='Image corresponding to post'
              className='p-2'
            />
          )}

          {video_url && (
            <video width='100%' height='100%' controls className='p-2'>
              <source src={video_url} type='video/mp4' />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className='flex justify-between mx-10'>
          <p>Likes: {likes.length}</p>
          <p
            className='hover:underline hover:cursor-pointer'
            onClick={handleViewComments}
          >
            Comments: {comments.length}
          </p>
        </div>

        <hr />

        <div className='flex justify-between mx-10'>
          <button
            className='my-2 bg-blue-500 py-1 px-4 rounded text-white text-sm'
            onClick={handleAddLike}
          >
            {likes.some((like) => like.created_by === getLoggedInUserId())
              ? 'Unlike'
              : 'Like'}
          </button>
          <button
            className='my-2 bg-blue-500 py-1 px-4 rounded text-white text-sm'
            onClick={handleAddCommentClick}
          >
            Comment
          </button>
        </div>

        <hr />

        {actionsCompleted.viewingComments && (
          <div>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className='mt-2 flex justify-start mx-2 pb-2'
              >
                <img
                  src={comment.created_by.image}
                  alt={comment.created_by.username}
                  className='rounded-full h-12 w-12 mr-2 border'
                />
                <div className=' px-6 py-3 max-w-fit bg-gray-300 rounded-2xl text-sm'>
                  <h3 className='font-semibold'>
                    {comment.created_by.username}
                  </h3>
                  <p>{comment.text}</p>
                </div>
              </div>
            ))}

            <div className='flex justify-around'>
              {/* <img
                src={comment.created_by.image}
                alt={comment.created_by.username}
                className='rounded-full h-12 w-12 mr-2'
              /> */}
              <input
                type='text'
                id='newchat'
                placeholder='Write a comment'
                className='block w-9/12 text-blue-800 text-sm rounded-2xl p-3 my-4 ml-12 border'
                onChange={handleNewCommentChange}
                value={newComment.text}
              />
              <button
                className='rounded-2xl mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 my-4'
                onClick={handleNewCommentSubmit}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedCard;
