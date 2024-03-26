import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles.js";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/PostsAction";

const Form = ({ currentId, setCurrentId }) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState();
  const posts = useSelector((state) => {
    return state.postReducer;
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
      setPostData(initialState);
    }
  }, [currentId]);

  const getPostDataForUpdate = () => {
    posts.forEach((post) => {
      if (post._id === currentId) {
        setPostData(post);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPostData(initialState);
    if (!currentId) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePost(currentId, postData));
      setCurrentId(null);
    }
  };
  const clear = () => {
    setCurrentId(null);
    setFileName(null);
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
          multiline
        />
        <TextField
          name="tags"
          label="Tags"
          variant="outlined"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(',') });
          }}
        />
        <div
          className={classes.fileInput}
          onClick={() => inputRef.current.click()}
        >
          <Typography
            variant="body1"
            style={{ textAlign: "center", fontWeight: 500 }}
          >
            Upload Image {fileName ? ": " + fileName : ""}
          </Typography>
          <input
            className={classes.inputButton}
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={(event) => {
              if (event.target.files[0]) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onloadend = function () {
                  setPostData({ ...postData, selectedFile: reader.result });
                };
                reader.readAsDataURL(file);
                setFileName(file.name);
              }
            }}
          />
        </div>
        <div className={classes.buttonContainer}>
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
            size="large"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
