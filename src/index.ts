//biblioteca express, que serve para criar servidores.
import express, {Request, Response} from "express";

// Importar a biblioteca para permitir conexão externa, 
// que permite o frontend (React/Next) se comunique com o backend (Express)
import cors from 'cors'

//aplicação Express, que é o servidor.
const app = express();

//Recurso que diz: “esse servidor vai entender dados em formato JSON” (exemplo: { "nome": "João" }).
app.use(express.json()); // Permite receber JSON

// Criar o middleware para receber os dados no corpo da requisição
app.use(cors());         // Permite chamadas do seu frontend para o seu backend.

//Importando as rotas dos usuários, que ficam em outro arquivo (UsersController.ts)
import UsersController from "./controllers/UsersController"

// Ativa todas as rotas que você criou dentro de UsersController.
app.use('/', UsersController) // Usa as rotas dos usuários

 // Rota raiz
app.get('/', (req: Request, res: Response) => {
    res.send('Bem-vindo')
})

// Inicia servidor
app.listen(8080, () => {
    //listen(8080) faz o servidor "escutar" a porta 8080 (como uma porta de entrada).
    console.log('Servidor iniciado na porta 8080: http://localhost:8080')
})