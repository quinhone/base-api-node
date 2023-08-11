import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface UserInterface extends Model {
    id: number;
    email: string;
    nome: string;
    password: string;
}

export const User = sequelize.define<UserInterface>('User', {
    id:{
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    nome: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'users',
    timestamps: false
})