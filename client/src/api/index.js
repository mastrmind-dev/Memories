import axios from "axios";

const url = "http://localhost:4000/posts";

export const fetchPosts = async() => {
  console.log(await axios.get(url))//this returns an object and it includes a key named 'data'. value of that key is an array which includes relavant data that we want.
  return await axios.get(url);
};

export const createPost = async (post) => {
  return await axios.post(url, post)
}