import express, { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../entities/User"
import { Not } from "typeorm"

//Criamos um agrupador de rotas
const router = express.Router();

// POST: http://localhost:8080/users
// {
// 	"name": "cesar",
// 	"email": "cesar@celke.com.br"
// }

//POST /users → Cria usuário.
router.post("/users", async (req: Request, res: Response) => {
    // res.send("Cadastrar");
    try{
        var data = req.body //req.body pega os dados que vieram do frontend
        //Exemplo: { "name": "João", "email": "joao@teste.com" }

        //repositório de usuários, que permite acessar o banco.
        const userRepository = AppDataSource.getRepository(User)

        //Verifica se já existe um usuário com o mesmo e-mail, se sim mostra mensagem de erro
        const existingUser = await userRepository.findOne({ where: {email: data.email}})
        if(existingUser){
            res.status(400).json({
            message: "Já existe usuário cadastrado com esse e-mail!",
            user: data
            })
            return
        }
        //Cria um novo usuário com os dados recebidos e salva no banco.
        const newUser = userRepository.create(data)
        await userRepository.save(newUser)

        res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            user: newUser
        })           
    }catch(error){ res.status(500).json({ message: "Erro ao cadastrar o usuário!" }) }
})

//GET /users → Lista todos.
router.get('/users', async (req: Request, res: Response) =>{
    try{
        //Pega todos os usuários do banco.
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        //Envia os dados como resposta
        res.status(200).json(users)
        return

    }catch(error){ res.status(500).json({ message:"Erro ao listar os usuários!" }) }
})

//GET /users/:id → :id é uma variável que representa o ID do usuário.
router.get('/users/:id', async (req: Request, res: Response) => {
    try{
        //req.params pega os parâmetros da URL (como o ID).
        const { id } = req.params

        //repositório de usuários, que permite acessar o banco.
        const userRepository = AppDataSource.getRepository(User)

        // o '!' diz ao TypeScript para confiar que aquele valor não é null nem undefined, mesmo que o tipo permita isso.
        //Verifica o usuário com aquele id, parseInt transforma o texto "1" em número 1.
        const user = await userRepository.findOneBy({ id: parseInt(id!)})

        if(!user){ 
            res.status(404).json({ message:"Erro ao visualizar o usuário!" }) 
            return 
        }

        res.status(200).json({ user })

    }catch(error){ res.status(500).json({ message:"Erro ao visualizar o usuário!" }) }
})


//PUT /users/:id → Atualiza.
router.put('/users/:id', async (req: Request, res: Response) => {
    try{
        //req.params pega os parâmetros da URL (como o ID).
        const { id } = req.params
        // res.send(`Editar: ${id}`)

        //Pega o ID da URL e os novos dados enviados pelo frontend
        const data = req.body

        //repositório de usuários, que permite acessar o banco.
        const userRepository = AppDataSource.getRepository(User)

        //Procura o usuário pelo ID.
        const user = await userRepository.findOneBy({ id: parseInt(id!)})

        //Se não encontrar, envia mensagem de erro
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!"
            })
            return
        }

        //Verifica se outro usuário já usa o mesmo e-mail (evita duplicidade).
        const existingUser = await userRepository.findOne({
            where: {
                email: data.email,
                id: Not(parseInt(id!)),
            }
        })

        if(existingUser){
            res.status(404).json({
                message: "Já existe um usuário cadastrado com esse email!"
            })
            return
        }

        // Atualiza os dados e salva no banco.
        userRepository.merge(user, data)
        const updateUser = await userRepository.save(user)

        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            user: updateUser,
        })

    }catch(error){ res.status(500).json({ message:"Erro ao editar o usuário!" }) }
})

//DELETE /users/:id → Remove.
router.delete('/users/:id', async (req: Request, res: Response) => {
    // res.send('Apagar')
    try{
        //req.params pega os parâmetros da URL (como o ID).
        const { id } = req.params
        //repositório de usuários, que permite acessar o banco.
        const userRepository = AppDataSource.getRepository(User)
        //Procura o usuário pelo ID.
        const user = await userRepository.findOneBy({id: parseInt(id!)})

        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado!"
            })
            return
        }
        // Remove o usuário do banco usuário.
        await userRepository.remove(user)

        res.status(200).json({
            message: "Usuário apagado com sucesso!",
        })

    }catch(error){ res.status(500).json({ message:"Erro ao apagar o usuário!" }) }
})

//Exporta as rotas para serem usadas no index.ts.
export default router
