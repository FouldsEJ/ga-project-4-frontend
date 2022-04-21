import { comment } from 'postcss';
import React from 'react';

function FeedCard({
  title,
  image_url,
  video_url,
  text,
  created_by,
  likes,
  comments,
  created_datetime,
}) {
  return (
    <div className='container m-auto my-10'>
      <div className='w-8/12 m-auto border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50'>
        <div class='grid grid-cols-6 p-5 gap-y-2'>
          <div>
            <img
              src={created_by.image}
              className='max-w-16 max-h-16 rounded-full'
            />
          </div>
          <div class='col-span-5 md:col-span-4 ml-4'>
            <p class='text-gray-600 font-bold'> {created_by.username} </p>
            <p class='text-sky-500 font-bold text-xs'> {created_by.ability}</p>

            <p class='text-gray-400'> {created_datetime} </p>
          </div>
          <div class='flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end'>
            <p class='rounded-lg text-sky-500 font-bold bg-sky-100  py-1 px-3 text-sm w-fit h-fit'>
              {' '}
              Delete{' '}
            </p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p>{text}</p>
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
          <p>Comments: {comments.length}</p>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default FeedCard;
