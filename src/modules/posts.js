import * as postsAPI from '../api/posts';
import {
  createPromiseSaga,
  createPromiseSagaById,
  handleAsyncActions,
  handleAsyncActionsById,
  reducerUtils,
} from '../lib/asyncUtils';
import { takeEvery, getContext, select } from 'redux-saga/effects';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST_BY_ID = 'GET_POST_BY_ID';
const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
const GET_POST_BY_ID_ERROR = 'GET_POST_BY_ID_ERROR';

const GO_TO_HOME = 'GO_TO_HOME';

const CLEAR_POST = 'CLEAR_POST';
const PRINT_STATE = 'PRINT_STATE';

export const getPosts = () => ({ type: GET_POSTS });
export const getPostById = id => ({
  type: GET_POST_BY_ID,
  payload: id,
  meta: id,
});
export const printState = () => ({ type: PRINT_STATE });

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostByIdSaga = createPromiseSagaById(GET_POST_BY_ID, postsAPI.getPostById);

export const goToHome = () => ({ type: GO_TO_HOME });

const initialState = {
  posts: reducerUtils.initial(),
  postById: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostByIdReducer = handleAsyncActionsById(GET_POST_BY_ID, 'postById', true);
function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}
function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST_BY_ID, getPostByIdSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}

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
