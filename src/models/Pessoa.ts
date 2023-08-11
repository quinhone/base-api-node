import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface PessoaInterface extends Model {
    id: number;
    usuario: number;
    nome: string;
    fantasia: string;
}

export const Pessoa = sequelize.define<PessoaInterface>('Pessoa', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    usuario: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    fantasia: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'pessoas',
    timestamps: false
})