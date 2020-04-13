const alert = require('../models/Alerts');
const comment = require('../models/Comments');

const commentsController = {};

// /GET all comments

commentsController.getComments = async (req, res) =>{
    
    const comments = await comment.find();
    res.json(comments);
} 
// /GET only data comments with alerts
commentsController.DataComment = async (req , res) =>{
    // await alert.find().populate('comment').exec((err, response)=>
    // {
    //     res.json(response)
    // })
    await comment.find().populate('alert').exec((err, response)=>
    {
        res.json(response)
    })
    // const getUsComment = await comment.findById(req.params.id);
    // res.json(getUsComment);
}

// /POST new comment
commentsController.NewComment = async (req, res) => {
    const newComment = new comment({
        comment: req.body.comment,
        alert: req.body.alert
    });
    await newComment.save();
    res.json({
        status: "Comment saved"
    });
}


// /DELETE comment
commentsController.deleteComment = async (req, res) =>{
    await comment.findByIdAndRemove(req.params.id);
    res.json({
        status: "Comment Deleted"
    })
}



module.exports = commentsController;