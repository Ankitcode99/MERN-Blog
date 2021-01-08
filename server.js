const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;

const globalURI = 'mongodb+srv://CoderHere:AnkitCode99@mern-blog-db.x0ltf.mongodb.net/mern-blog-db?retryWrites=true&w=majority';
const localURI = 'mongodb://localhost/mern_blog'

/**
 * 
 * Steps to use DB:
 * - connect to local or cloud DB
 * - define a data schema fot the data you are going to store in your DB
 * - create a MongoDB model for using your custom Schema
 */

// connect DB
mongoose.connect(globalURI || localURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// Checking Successful DB connection
mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected!!!')
})

// Schema of Data in DB
const Schema = mongoose.Schema;
const blogPostSchema = new Schema({
    title:String,
    body:String,
    author:String,
    date:{
        type:String,
        default : Date.now()
    }
});

// Model
const blogPost = mongoose.model('BlogPost',blogPostSchema);

// Saving sample data to DB
const data = {
    title: 'Basics of Dynamic Programming',
    body : 'Based on a real life principle remember your past mistakes to not commit them in future',
    author: 'Ankit Pandey'
}

// custom save function for mongoDB
const newBlogPost = new blogPost(data);

// newBlogPost.save((err)=>{
//     if(err)
//     {
//         console.log('Problem occurred while saving the blog!');
//     }
//     else
//     {
//         console.log('Viola! Blog saved successfully');
//     }
// })



//HTTP request logger
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    const data = {
        "name":"Ankit Pandey",
        "Profession":"Developer",
        "skills":[
            "C++","JAVA","Python"
        ]
    }

    blogPost.find({ })
    .then((data)=>{
        console.log(data);
        console.log(`data type = `+ typeof data)
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })

    // res.json(data)
})

app.listen(PORT, console.log(`I am on at Port ${PORT}`));