import React, { useState } from "react";
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
import { deletePost, likePost } from "../../../actions/PostsAction";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [liked, setLiked] = useState(post.likeCount > 0 ? true : false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

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
            const likeCountTemp =
              !liked === true
                ? likeCount + 1
                : likeCount !== 0 && likeCount - 1;

            dispatch(
              likePost(post._id, {likeCount: likeCountTemp})
            );

            setLiked(!liked);
            setLikeCount(likeCountTemp);
          }}
          className={classes.likeButton}
          variant="contained"
        >
          <ThumbUpAltIcon size="default" />
          LIKE
          {likeCount}
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
