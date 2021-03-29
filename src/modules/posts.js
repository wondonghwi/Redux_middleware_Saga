import * as postsAPI from '../api/posts';
import {
  createPromiseSaga,
  createPromiseSagaById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '../lib/asyncUtils';
import { takeEvery } from 'redux-saga/effects';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST_BY_ID = 'GET_POST_BY_ID';
const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
const GET_POST_BY_ID_ERROR = 'GET_POST_BY_ID_ERROR';

const CLEAR_POST = 'CLEAR_POST';

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = id => ({
  type: GET_POST_BY_ID,
  payload: id,
  meta: id,
});

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostByIdSaga = createPromiseSagaById(GET_POST_BY_ID, postsAPI.getPostById);

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST_BY_ID, getPostByIdSaga);
}

export const goToHome = () => (dispatch, getState, { history }) => {
  history.push('/');
};

const initialState = {
  posts: reducerUtils.initial(),
  postById: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostByIdReducer = handleAsyncActionsById(GET_POST_BY_ID, 'postById', true);

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST_BY_ID:
    case GET_POST_BY_ID_SUCCESS:
    case GET_POST_BY_ID_ERROR:
      return getPostByIdReducer(state, action);
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial(),
      };
    default:
      return state;
  }
};
