const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BlogPost = require("./Model");
const app = express();
require("dotenv").config();
mongoose.connect(
  `mongodb://localhost/blogs`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error(err);
    console.log("database connected");
  }
);
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,         
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     })
app.post("/add", cors(corsOptions),(req, res) => {
  console.log("add");
  console.log("BlogPost", req.body);
  const title = req.body.title;
  const body = req.body.body;
  BlogPost({
    title: title,
    body: body,
  })
    .save()
    .then((result) => {
      console.log("data saved", result);
    });
});
app.post("/sayhello",cors(corsOptions), (req, res) => {
  res.json({ hello: "world" });
});
app.post("/update", (req, res) => {
  console.log("id", req.body);
  // console.log("title",req.body.title)
  // console.log("body",req.body.body)
  BlogPost.findByIdAndUpdate(
    { _id: req.body.id },
    {
      title: req.body.title,
      body: req.body.body,
    },
    { new: true }
  ).then((result) => {
    console.log("data updated", result);
  });
});
app.post("/delete",cors(corsOptions), (req, res) => {
  console.log("delete is called", req.body.id);
  BlogPost.findOneAndRemove({ _id: req.body.id }).then((result) => {
    console.log("data deleted", result);
  });
});
app.post("/hello",cors(corsOptions), (req, res) => {
  console.log("dkfnsdm");
  console.log("req.body", req.body);
});
app.post("/display",cors(corsOptions), (req, res) => {
  BlogPost.find().then((result) => {
    res.send(result);
  });
});
app.listen(process.env.PORT || 8080, () => {
  console.log("port is 8080");
});
