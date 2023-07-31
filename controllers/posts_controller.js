const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (post && post.user == req.user.id) {
            await Post.findByIdAndDelete(post.id);
            await Comment.deleteMany({ post: req.params.id })

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'post deleted!'
                })
            }

            req.flash('success', 'post deleted')
            res.redirect('back');
        }

    } catch (err) {
        req.flash('error', err);
        res.redirect('back');
    }
}