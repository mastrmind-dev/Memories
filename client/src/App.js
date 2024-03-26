import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grid, Grow } from "@material-ui/core";
import memories from "./images/memories.png";
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import useStyles from "./styles.js";
import { useDispatch } from "react-redux";
import { getPosts } from "./actions/PostsAction";
// import "./App.css"

const App = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);
  
  return (
    <Container maxwidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          Memories
        </Typography>
        <img
          src={memories}
          alt="memories"
          height="60"
          className={classes.image}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignitems="stretch" className={classes.overallContainer}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
