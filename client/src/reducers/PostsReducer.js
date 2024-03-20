export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return [];
    case "DELETE":
      return posts.filter((post) => post._id !== action.payload.postId);
    default:
      return posts;
  }
};
