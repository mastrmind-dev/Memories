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
    console.error(error.message)
  }
};

export const updatePost = (currentId, postData) => async(dispatch)=> {
try {
  const {data} = await api.updatePost(currentId, postData)
  console.log("updated post", data)
  getPosts()
} catch (error) {
  console.log(error.message)
}
}