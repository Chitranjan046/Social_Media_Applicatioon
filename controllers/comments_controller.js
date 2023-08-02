// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = async function(req, res){

//     try{
//         let post = await Post.findById(req.body.post);

//         if (post){
//             let comment = await Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });

//             post.comments.push(comment);
//             post.save();
//     // if request comming from AJAX We are responding with json       
//             if (req.xhr)
//             {
//                 return res.status(200).json
//                 ({
//                     data: 
//                     {
//                         comment: comment
//                     },
//                     message: "Comment created"
//                 });
//             }
//             req.flash('success', 'Comment published!');

//             res.redirect('/');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


// module.exports.destroy = async function(req, res){

//     try{
//         let comment = await Comment.findById(req.params.id);

//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             let post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
//        // if request comming from AJAX We are responding with json   
            
//             if (req.xhr)
//             {
//                 return res.status(200).json({
//                     data: {
//                         comment_id: req.params.id
//                     },
//                     message: "Comment deleted"
//                 });
//             }
//             req.flash('success', 'Comment deleted!');

//             return res.redirect('back');
//         }else{
//             req.flash('error', 'Unauthorized');
//             return res.redirect('back');
//         }
//     }catch(err){
//         req.flash('error', err);
//         return;
//     }
    
// }


const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
// const queue = require('../config/kue');
// const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            
            comment = await comment.populate('user', 'name email').execPopulate();
            // it is new comment user can comments it is send vai email it is show email
            // commentsMailer.newComment(comment);
            
            // let job = queue.create('emails', comment).save(function(err){
            //     if (err){
            //         console.log('Error in sending to the queue', err);
            //         return;
            //     }
            //     console.log('job enqueued', job.id);

            // })

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }


            req.flash('success', 'Comment published!');

            res.redirect('/');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }


            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
    
}