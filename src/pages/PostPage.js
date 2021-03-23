import React from 'react';
import PostByIdContainer from '../containers/PostByIdContainer';

const PostPage = ({ match }) => {
  const { id } = match.params;
  const postId = parseInt(id, 10);
  return (
    <div>
      <PostByIdContainer postId={postId} />
    </div>
  );
};

export default PostPage;
