//importing modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
//auth. function
const tokenSecret = process.env.TOKEN_SECRET as string;
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, tokenSecret);
        next();
        return;
    } catch (err) {
        return res.status(401).send(err + '  access denied!');
    }
};
export default verifyAuthToken;
