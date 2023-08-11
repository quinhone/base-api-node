import { Request, Response } from 'express';

import { Pessoa } from '../models/Pessoa';

export const createPessoa =  async (req: Request, res:Response) => {
    //let { nome, usuario, fantasia } = req.body; // Também pode pegar dessa forma
    let nome: string = req.body.nome;
    let usuario: string = req.body.usuario;
    let fantasia: string = req.body.fantasia;

    let pessoa = await Pessoa.create({
        nome,
        usuario,
        fantasia
    })

    res.status(201)
    res.json({
        id: pessoa.id,
        nome,
        usuario,
        fantasia
    })
}

export const getPessoas = async (req: Request, res: Response) => {
    let pessoas = await Pessoa.findAll()
    res.status(200);
    res.json({ pessoas })
}

export const getPessoa = async (req: Request, res: Response) => {
    
    let { id } = req.params;

    let pessoa = await Pessoa.findByPk(id)
    
    if(pessoa){
        res.status(200);
        res.json({ pessoa })
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }
}

export const updatePessoa = async (req: Request, res: Response) => {
    let { id } = req.params;
    let { nome, usuario, fantasia } = req.body;

    let pessoa = await Pessoa.findByPk(id)

    if(pessoa){
        pessoa.nome = nome;
        pessoa.usuario = usuario;
        pessoa.fantasia = fantasia;
        await pessoa.save();
        res.status(200);
        res.json({ pessoa });
    }else{
        res.status(404);
        res.json({error: 'Pessoa não localizada'})
    }

}

export const deletePessoa = async (req: Request, res: Response) => {
    
    let { id } = req.params;
    
    await Pessoa.destroy({
        where: {
            id
        }
    })

    res.json({})
    
}