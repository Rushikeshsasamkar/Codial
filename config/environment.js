require('dotenv').config();
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
});



const developement = {
    name: 'developement',
    asset_path: './assets',
    session_cookie_key: '>9,#=8?o^u~NLRBmYVz',
    db: 'codeial_developement',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'technicalprogramming111@gmail.com',
            pass:'******'
        }
    },
    
        google_client_id:"256246325715-p7rlioenark1ak4l8ir88ervelsjevlm.apps.googleusercontent.com",
        google_client_secret:"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",
        google_call_back_url:"http://localhost:8000/users/auth/google/callback",
        jwt_secret: '=`8V`P]=.=_&rp|x864*]g{AUh/x]Je~b+8C7>w%f{POO66xKt:I<$;x*fHQd_1',
        morgan: {
            mode: 'dev',
            options: { stream: accessLogStream }
        }
}

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'technicalprogramming111@gmail.com',
            pass:'******'
        }
    },
    
        google_client_id:"256246325715-p7rlioenark1ak4l8ir88ervelsjevlm.apps.googleusercontent.com",
        google_client_secret:"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",
        google_call_back_url:"http://localhost:8000/users/auth/google/callback",
        jwt_secret: process.env.CODEIAL_JWT_SECRET,
        morgan: {
            mode: 'combined',
            options: { stream: accessLogStream }
        }
}

// module.exports = developement;

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? developement : eval(process.env.CODEIAL_ENVIRONMENT); 
