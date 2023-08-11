import { Request, Response, NextFunction} from 'express'
import JWT from 'jsonwebtoken'
import { User } from '../models/User'
import dotenv from 'dotenv'

dotenv.config()


export const AuthJWT = {
    private: async (req: Request, res:Response, next: NextFunction) => {
        let success = false;

        if(req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
            if(authType ==='Bearer') {
                try {
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string)

                    success = true
                } catch (err) {
                    
                }
            }else{
                res.status(403)
                res.json({ error: 'Não autorizado'})
            }
            
        }

        if(success) {
            next()
        }else{
            res.status(403)
            res.json({ error: 'Não autorizado'})
        }
    }
}