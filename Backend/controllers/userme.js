import usermodel from '../models/user.js'
import JWT from 'jsonwebtoken'

export const userMe = async (req, res) => {
    const token = req.headers.authorization
    if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authorization token is missing',
        });
    }
        
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decode._id)
        return res.status(200).send(user)
       
}