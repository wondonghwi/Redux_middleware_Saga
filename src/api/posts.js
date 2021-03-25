import axios from 'axios';

export const getPosts = async () => {
  try {
    const response = await axios.get('/posts');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getPostById = async id => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
