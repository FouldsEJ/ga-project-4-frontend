// const baseUrl = `http://127.0.0.1:8000/`;
const baseUrl = `https://spikesquad.herokuapp.com/`;

import axios from 'axios';

export const getAllPosts = async () => {
  const options = {
    method: 'GET',
    url: `${baseUrl}posts/`,
  };
  const { data } = await axios.request(options);
  return data;
};

export const createPost = async (newPost) => {
  console.log('newcommnet data: ', newPost);
  const options = {
    method: 'POST',
    url: `${baseUrl}posts/`,
    data: newPost,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};
export const deletePost = async (id) => {
  const options = {
    method: 'DELETE',
    url: `${baseUrl}posts/${id}/`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};

export const getCommentsByPost = async (postid) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}comments/?postid=${postid}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const createComment = async (newComment) => {
  console.log('newcommnet data: ', newComment);
  const options = {
    method: 'POST',
    url: `${baseUrl}comments/`,
    data: newComment,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};

export const getLikesByPost = async (postid) => {
  const options = {
    method: 'GET',
    url: `${baseUrl}likes/?postid=${postid}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const addLike = async (newLike) => {
  console.log('newlike data: ', newLike);
  const options = {
    method: 'POST',
    url: `${baseUrl}likes/`,
    data: newLike,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};

export const deleteLike = async (id) => {
  const options = {
    method: 'DELETE',
    url: `${baseUrl}likes/${id}/`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);

  return data;
};
