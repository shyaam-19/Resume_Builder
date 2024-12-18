import JWT from 'jsonwebtoken'

export const requireSignIn = async(req,res)=>{
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log(error);
    }
}