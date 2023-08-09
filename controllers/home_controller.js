const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
    //poputate the user for each posts

    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
            
        });
    }
    catch(err){
        console.log('Error in Function Find',err);
        return; 
    }
    
}

// module.exports.actionName = function(req, res){}