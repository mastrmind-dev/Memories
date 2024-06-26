import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/actionTypes";

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    // return [...posts, action.payload]; this will not update the post, it will create a new post
    case DELETE:
      return posts.filter((post) => post._id !== action.payload.postId);
    default:
      return posts;
  }
};
