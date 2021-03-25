import * as postsAPI from '../api/posts';
import { createPromiseThunk, handleAsyncActions, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST_BY_ID = 'GET_POST_BY_ID';
const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
const GET_POST_BY_ID_ERROR = 'GET_POST_BY_ID_ERROR';

const CLEAR_POST = 'CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPostById = id => async dispatch => {
  dispatch({ type: GET_POST_BY_ID, meta: id });
  try {
    const payload = await postsAPI.getPostById(id);
    dispatch({ type: GET_POST_BY_ID_SUCCESS, payload, meta: id });
  } catch (e) {
    dispatch({
      type: GET_POST_BY_ID_ERROR,
      payload: e,
      error: true,
      meta: id,
    });
  }
};
const initialState = {
  posts: reducerUtils.initial(),
  postById: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, 'posts', true);
const getPostByIdReducer = (state, action) => {
  const id = action.meta;
  switch (action.type) {
    case GET_POST_BY_ID:
      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: reducerUtils.loading(state.postById[id] && state.postById[id].data),
        },
      };
    case GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: reducerUtils.loading(action.payload),
        },
      };
    case GET_POST_BY_ID_ERROR:
      return {
        ...state,
        postById: {
          ...state.postById,
          [id]: reducerUtils.loading(action.payload),
        },
      };
    default:
      return state;
  }
};

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
