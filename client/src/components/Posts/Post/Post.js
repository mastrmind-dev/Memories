import React, { useEffect, useState, useRef } from "react";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { deletePost, updatePost } from "../../../actions/PostsAction";

const Post = ({ post, setCurrentId }) => {
  const user = "gethara";
  const dispatch = useDispatch();
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [postId, setPostId] = useState(null);
  const initialRender = useRef(true); //this is used to prevent useEffect, executing the code block at the first render.

  useEffect(() => {
    if (initialRender.current) {
      console.log("intialRender");
      initialRender.current = false;
    } else {
      putALike(postId);
    }
  }, [liked]);

  async function putALike(postId) {
    if (
      liked &&
      !post.likedUsers.find((likedUser) => {
        return likedUser == user;
      })
    ) {
      post.likedUsers.push(user);
      console.log(post.likedUsers);
      dispatch(updatePost(postId, { likeCount: ++post.likeCount }));
      setPostId(null);
    } else {
      if (!(post.likeCount === 0)) {
        dispatch(updatePost(postId, { likeCount: --post.likeCount }));
        setPostId(null);
      }
    }
  }

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => {
            return `#${tag} `;
          })}
        </Typography>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            setPostId(post._id);
            setLiked(!liked);
          }}
        >
          <ThumbUpAltIcon size="default" />
          Like
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(deletePost(post._id));
          }}
        >
          <DeleteIcon size="default" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
