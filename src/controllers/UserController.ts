import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

import { User } from '../models/User';

export const createUser =  async (req: Request, res:Response) => {
    if(req.body.email && req.body.password && req.body.nome){

        let nome: string = req.body.nome;
        let email: string = req.body.email;
        let password: string = req.body.password;

        let hasUser = await User.findOne({
            where: {
                email
            }
        });

        if(!hasUser) {
            let user = await User.create({
                nome,
                email,
                password
            })

            res.status(201)
            res.json({
                id: user.id,
                nome,
                email,
                password
            })
        }else{
            res.json({error: 'Usuário já existe'})
        }

    }else{
        res.json({error: 'Email e/ou senha não enviados'})
    }
    
}

export const loginBasic = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password){
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({
            where: { email, password }
        });

        if(user) {
            res.json({ status: true });
            return
        }else{
            res.json({ status: false });
        }
    }else{
        res.json({ error: 'Email e Senha são requeridos' });
    }

}

export const loginJWT = async (req: Request, res: Response) => {
    if(req.body.email && req.body.password){
        let email: string = req.body.email;
        let password: string = req.body.password;

        let user = await User.findOne({
            where: { email, password }
        });

        if(user) {

            const token = JWT.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET_KEY as string,
                { expiresIn: '2h' }
            )

            res.json({ status: true, token });
            return
        }else{
            res.json({ status: false });
        }
    }else{
        res.json({ error: 'Email e Senha são requeridos' });
    }

}

export const getUsers = async (req: Request, res: Response) => {
    let users = await User.findAll()
    res.status(200);
    res.json({ users })
}

export const getUser = async (req: Request, res: Response) => {
    
    let { id } = req.params;

    let user = await User.findByPk(id)
    
    if(user){
        res.status(200);
        res.json({ user })
    }else{
        res.status(404);
        res.json({error: 'User não localizada'})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { nome, email, password } = req.body;

    let user = await User.findByPk(id)

    if(user){
        user.nome = nome;
        user.email = email;
        user.password = password;
        await user.save();
        res.status(200);
        res.json({ user });
    }else{
        res.status(404);
        res.json({error: 'User não localizada'})
    }

}

export const deleteUser = async (req: Request, res: Response) => {
    
    let { id } = req.params;
    
    await User.destroy({
        where: {
            id
        }
    })

    res.json({})
    
}