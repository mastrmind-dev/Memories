import axios from "axios";

const url = "http://localhost:4000/posts";

export const fetchPosts = async () => {
  return await axios.get(url);
};

export const createPost = async (post) => {
  return await axios.post(url, post);
};

export const updatePost = async (id, updateData) => {
  return await axios.patch(`${url}/${id}`, updateData);
};

export const deletePost = async (postId) => {
  return await axios.delete(`${url}/${postId}`);
};

export const likePost = async (postId, likeCount) => {
  return await axios.patch(`${url}/${postId}/likePost`, likeCount);
}
