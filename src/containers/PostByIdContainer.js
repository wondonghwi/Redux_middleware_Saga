import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPost, getPostById } from '../modules/posts';
import PostById from '../components/PostById';

const PostByIdContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(state => state.posts.postById);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(postId));
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch, postId]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return <PostById post={data} />;
};

export default PostByIdContainer;
