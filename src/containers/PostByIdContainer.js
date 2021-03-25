import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, goToHome } from '../modules/posts';
import PostById from '../components/PostById';
import { reducerUtils } from '../lib/asyncUtils';

const PostByIdContainer = ({ postId }) => {
  const { data, loading, error } = useSelector(state => state.posts.postById[postId] || reducerUtils.initial());
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return;
    dispatch(getPostById(postId));
  }, [data, dispatch, postId]);

  if (loading && !data) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <PostById post={data} />
    </>
  );
};

export default PostByIdContainer;
