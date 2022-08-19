import * as api from "../api";
import * as postActions from "./PostsAction";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await api.createPost(postData);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePost = (currentId, postData) => async (dispatch) => {
  return new Promise(async (res, rej)=>{
    try {
      const { data } = await api.updatePost(currentId, postData);
      console.log("updated post", data);
      res(data)
    } catch (error) {
      console.log(error.message);
      rej(error.message)
    }
  })
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(postId);
    dispatch({type:"DELETE", payload: postId })
  } catch (error) {
    console.log(error.message);
  }
};
