const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email:req.body.email});

        if(!user | user.password != req.body.password){
            return res.json(422,{
                messege: "Invalid username/Password"
            })
        }

        return res.json(200,{
            messege:"Sign in Sucessful here is user token please keep it safe",
            data:{
                tokem:jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        })

    }
    catch(err){ 
        console.log('********', err);
        return res.json(500, {
        message: "Internal Server Error"
    });

    }


   

}