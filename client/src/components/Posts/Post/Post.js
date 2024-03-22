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
import { ArrowDropDown } from "@material-ui/icons";

const Post = ({ post, setCurrentId }) => {
  const user = "gethara";
  const dispatch = useDispatch();
  const classes = useStyles();
  const [liked, setLiked] = useState(post.likeCount > 0 ? true : false);
  const [postId, setPostId] = useState(null);
  const initialRender = useRef(true); //this is used to prevent useEffect, executing the code block at the first render.

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      putALike(postId);
    }
  }, [liked]);

  async function putALike(postId) {
    if (liked && !post.likedUsers.includes(user)) {
      post.likedUsers.push(user);
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
          style={{ fontWeight: 600 }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}
          color="primary"
          variant="outlined"
        >
          {/* <MoreHorizIcon fontSize="medium"></MoreHorizIcon> */}
          Update
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
          {post.title}
        </Typography>
        <Typography className={classes.message} variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          onClick={() => {
            setPostId(post._id);
            setLiked(!liked);
          }}
          className={classes.likeButton}
          variant="contained"
        >
          <ThumbUpAltIcon size="default" />
          LIKE
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="secondary"
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
