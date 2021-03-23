import React from 'react';

const PostById = ({ post }) => {
  const { title, body } = post;
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default PostById;
