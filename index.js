const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const BlogPost = require("./Model");
const app = express();
require("dotenv").config();
mongoose.connect(
  `mongodb+srv://sagar151:sagargajera2000@cluster0.w6ifx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.error(err);
    console.log("database connected");
  }
);
// const corsOptions ={
//     origin:'http://localhost:3000', 
//     credentials:true,         
//     optionSuccessStatus:200,
// }
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
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
