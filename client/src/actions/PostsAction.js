import * as api from "../api";

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
      dispatch({ type: "UPDATE", payload: data });
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
    dispatch({type:"DELETE", payload: {postId} })
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(postId);
    dispatch({type:"LIKE", payload: data })
  } catch (error) {
    console.log(error.message);
  }
}
