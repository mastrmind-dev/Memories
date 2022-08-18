import React, { useEffect, useState } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/PostsAction";

const Form = ({ currentId, setCurrentId }) => {
  const posts = useSelector((state) => {
    return state.posts;
  });
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();

  const initialState = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  };

  useEffect(() => {
    if (currentId) {
      getPostDataForUpdate();
    } else {
      console.log("current");
      setPostData(initialState);
    }
  }, [currentId]);

  const getPostDataForUpdate = () => {
    posts.forEach((post) => {
      if (post._id == currentId) {
        setPostData(post);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostData(initialState)
    if (!currentId) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
      setCurrentId(null);
    }
  };
  const clear = () => {
    console.log("hi");
    setCurrentId(null);
    setPostData(initialState);
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`} //or {classes.root + " " + classes.form}
        onSubmit={handleSubmit}
      >
        {/*if we need to pass some arguments to handleSubmit function, we should wrap the handliSubmit function inside of an arrow function.*/}
        <Typography
          variant="h6"
          style={{ backgroundColor: "#FFAA00", padding: 10, borderRadius: 5 }}
        >
          {currentId ? "Updating a memory" : "Creating a memory"}
        </Typography>
        <TextField
          name="creator"
          label="Creator"
          variant="outlined"
          fullWidth
          value={postData.creator}
          onChange={(e) => {
            setPostData({ ...postData, creator: e.target.value });
          }}
        />
        <TextField
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />
        <TextField
          name="message"
          label="Message"
          variant="outlined"
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
