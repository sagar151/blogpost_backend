const mongoose=require("mongoose")
// const {model, models} = require("mongoose");
const BlogSchema=mongoose.Schema({
       title:{
           type:String,
           // required:true,
       },
       body:{
           type:String,
           // required: true,
       },
        date:{
               type:Date,
               default:Date.now()
        }

})
module.exports =mongoose.model("BlogPost",BlogSchema,"blogs");
