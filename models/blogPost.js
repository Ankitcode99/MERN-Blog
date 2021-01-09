const mongoose = require('mongoose')


/**
 * 
 * Steps to use DB:
 * - connect to local or cloud DB
 * - define a data schema fot the data you are going to store in your DB
 * - create a MongoDB model for using your custom Schema
 */


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


module.exports = blogPost; //<- blogPost : model name



// Saving sample data to DB
// const data = {
//     title: 'Basics of Dynamic Programming',
//     body : 'Based on a real life principle remember your past mistakes to not commit them in future',
//     author: 'Ankit Pandey'
// }

// custom save function for mongoDB
// const newBlogPost = new blogPost(data);
/** 
 * 
 * newBlogPost.save((err)=>{
    if(err)
    {
        console.log('Problem occurred while saving the blog!');
    }
    else
    {
        console.log('Viola! Blog saved successfully');
    }
})
 * 
*/