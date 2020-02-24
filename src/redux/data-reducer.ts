import { AppActions, LOADING_DATA, SET_POSTS, LIKE_POST, UNLIKE_POST, DELETE_POST, LOADING_UI, ADD_POST, SET_ERRORS, CLEAR_ERRORS, SET_POST, SUBMIT_COMMENT } from './actions';
import { Dispatch } from 'react';
import axios from 'axios';
import { stopLoading, clearErrors } from './ui-reducer';
const initialState: State = {
     posts: [],
     post: {
          body: "",
          commentsCount: 0,
          createdAt: "",
          likeCount: 0,
          userHandle: "",
          userImage: "",
          postId: "",
          comments: []
     },
     loading: false
}
export interface Comment {
     body: string;
     createdAt: string;
     userHandle: string;
     userImage: string;
}

export interface Post {
     body: string;
     commentsCount: number;
     createdAt: string;
     likeCount: number;
     userHandle: string
     userImage: string;
     postId: string;
     comments: Array<Comment>
}

export interface State {
     posts: Array<Post>,
     post: Post,
     loading: boolean;
}


export const dataReducer = (state: State = initialState, action: AppActions) => {
     let index;
     switch (action.type) {
          case LOADING_DATA:
               return {
                    ...state,
                    loading: true
               }
          case SET_POSTS:
               // console.log(action.payload);
               return {
                    ...state,
                    posts: action.payload,
                    loading: false
               }
          case LIKE_POST:
          case UNLIKE_POST:
               index = state.posts.findIndex(post => post.postId === action.payload.postId);
               state.posts[index] = action.payload;
               if (state.post!.postId === action.payload.postId) {
                    state.post = action.payload;
               }
               return {
                    ...state,
                    posts: state.posts.map((post) => post)
               }
          case DELETE_POST:
               index = state.posts.findIndex((post) => post.postId === action.payload);
               state.posts.splice(index, 1);
               return {
                    ...state,
                    posts: state.posts.map((post: any) => post)
               }
          case ADD_POST:
               return {
                    ...state,
                    posts: [
                         action.payload,
                         ...state.posts
                    ]
               }
          case SET_POST:
               return {
                    ...state,
                    loading: false,
                    post: action.post
               }
          case SUBMIT_COMMENT:
               return {
                    ...state,
                    post: {
                         ...state.post,
                         comments: [action.comment, ...state.post.comments] as Array<Comment>
                    }
               }
          default:
               return state;
     };

}


export const getPosts = () => async (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_DATA });
     try {
          const { data } = await axios.get("/posts");
          dispatch({ type: SET_POSTS, payload: data });
     }
     catch (err) {
          dispatch({ type: SET_POSTS, payload: [] })
          console.log(`data-reducer, getPosts Error:${err}`);
     }
}



export const likePost = (postId: string) => async (dispatch: Dispatch<AppActions>) => {
     try {
          const { data } = await axios.get(`/posts/${postId}/like`);
          dispatch({ type: LIKE_POST, payload: data });
     }
     catch (err) {
          console.log(`Error in data-reducer, likePost, Error:${err}`);
     }
}

export const addPost = (body: string) => async (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_UI });

     return axios.post("/post", { body }).then(({ data }) => {
          dispatch({
               type: ADD_POST,
               payload: data
          });
          dispatch({ type: CLEAR_ERRORS });
          return false;
     }).catch(err => {
          dispatch({
               type: SET_ERRORS,
               payload: err.response.data
          });
          return true;
     });

}


export const unlikePost = (postId: string) => async (dispatch: Dispatch<AppActions>) => {
     try {
          const { data } = await axios.get(`/posts/${postId}/unlike`);
          dispatch({ type: UNLIKE_POST, payload: data });
     }
     catch (err) {
          console.log(`Error in data-reducer, unlikePost, Error:${err}`);
     }
}
export const deletePost = (postId: string) => async (dispatch: Dispatch<AppActions>) => {
     try {
          const { data } = await axios.delete(`/posts/${postId}`);
          dispatch({ type: DELETE_POST, payload: postId });
     } catch (err) {
          console.log(`data-reducer deletePost, error:${err}`);
     }
}

export const getPost = (id: string) => async (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_UI });
     try {
          const { data } = await axios.get(`/posts/${id}`);
          dispatch({ type: SET_POST, post: data });
          dispatch(stopLoading());
     } catch (err) {
          console.log(err);
     }
}

export const addCommentAC = (postId: string, text: string) => async (dispatch: Dispatch<AppActions>) => {
     try {
          const { data } = await axios.post(`/posts/${postId}/comment`, { body: text });
          dispatch({ type: SUBMIT_COMMENT, comment: data });
          dispatch(clearErrors());
     }
     catch (err) {
          console.log(err.response.data);
          dispatch({ type: SET_ERRORS, payload: err.response.data })
     }
}


export const getUserData = (userHandle: string) => async (dispatch: Dispatch<AppActions>) => {
     dispatch({ type: LOADING_DATA });
     try {
          const { data } = await axios.get(`/user/${userHandle}`);
          // console.log(data);
          dispatch({ type: SET_POSTS, payload: data.posts });

     } catch (err) {
          dispatch({ type: SET_POSTS, payload: [] });
     }
}

// export type GetPost = typeof getPost; 