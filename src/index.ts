import express, {Request, Response} from "express";
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize()
    .then(()  => {
        console.log('Conexão Realizada com Sucesso!')
    }).catch((error) => {
        console.log('Erro na conexão com o banco de dados:', error)
    })

app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo')
});

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080')
});