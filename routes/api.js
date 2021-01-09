const express = require('express');
const blogPost = require('../models/blogPost')
const router = express.Router()
const bodyParser = require('body-parser')


router.get('/',(req,res)=>{
    
    blogPost.find({ })
    .then((data)=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post('/save',(req,res)=>{
    const userInput = req.body;
    const newPost = new blogPost(userInput);
    newPost.save((err)=>{
        if(err)
        {
            res.status(404).json({
                msg:'Internal Server Error'
            })
            return;
        }
        else
        {
            res.json({
                msg : "Blog Post saved successfully!"
            });
        }
    })
})

router.delete('/:id',(req,res)=>{
    const postId = req.params.postId;

    blogPost.findByIdAndDelete(req.params.id,(err)=>{
        if(err)
        {
            console.log(err);
            res.status(404).json({
                msg : 'Unable to delete'
            })
            
        }
        else{
            res.json({
                msg:'Blog deleted successfully!'
            })
        }
    })
})

module.exports = router