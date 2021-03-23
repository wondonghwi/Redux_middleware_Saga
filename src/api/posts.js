const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// { id , title , body }
const posts = [
  {
    id: 1,
    title: '리덕스 미들웨어',
    body: '직접 해보기',
  },
  {
    id: 2,
    title: '리덕스 Thunk',
    body: 'Redux-Thunk',
  },
  {
    id: 3,
    title: '리덕스 Saga',
    body: 'Redux-Saga',
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
};

export const getPostById = async id => {
  await sleep(500);
  return posts.find(post => post.id === id);
};
