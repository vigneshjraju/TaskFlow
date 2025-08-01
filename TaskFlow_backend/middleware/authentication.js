import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate=(req,res,next)=>{
    const cookie=req.headers.cookie; //cookie instead of cookies
    console.log(cookie);

    if (!cookie){
     
        console.log("Please login to continue.");
        res.status(401).send("Please login to continue.")
        
    }

    else {

        const [name,Token]=cookie.trim().split('=');
        console.log(name);
        console.log(Token);

        if(name=="authToken"){
            const verified=jwt.verify(Token,process.env.SECRET_KEY)
            console.log(verified);

            req.userid=verified.userId; 
            req.userrole=verified.role; 

            next();
        }

        else{
            res.status(401).send("unauthorized Access")
        }

    }

}

export default authenticate