"use strict";

const PostMessage = require("../models/postMessage");
const mongoose = require("mongoose");

//this is how you export multiple functions in node.js, using them as object key valu pairs
module.exports = {
  getPosts: async (req, res) => {
    try {
      const postMessages = await PostMessage.find();
      res.status(200).json(postMessages);
    } catch (error) {
      console.log(error.message);
      res.status(404).json({ message: error.message });
    }
  },

  createPost: async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;
    // console.log(post)
    // const selectedFile = JSON.stringify(selectedFile)
    // console.log(typeof(sf))
    const newPost = new PostMessage({
      title,
      message,
      selectedFile,
      creator,
      tags,
    });
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    const { id: _id } = req.params;

    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true, //this is a compulsory thing if we want to get updated document as a return. otherwise mongodb returns the document before updating.
    });
    res.json(updatedPost);
  },

  deletePost: async (req, res) => {
    try {
      const { id: _id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

      const deletePost = await PostMessage.deleteOne({ _id });

      res.json(deletePost);
    } catch (error) {
      console.log(error.message);
    }
  },
};
