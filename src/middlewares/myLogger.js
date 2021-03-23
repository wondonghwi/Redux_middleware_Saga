const myLogger = store => next => action => {
  console.log(action);
  console.log('\t Prev', store.getState());
  const result = next(action);
  console.log('\t Next', store.getState());
  return result;
};

export default myLogger;
