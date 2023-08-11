import express, {Request, Response} from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'

dotenv.config();

const server = express();

server.use(cors({
    origin: "*"
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use(routes);

server.use( (req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpont não encontrado'});
})

server.listen(process.env.PORT);
