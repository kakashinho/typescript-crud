import "reflect-metadata"// importação para o TypeORM funcionar com decoradores (@Entity, @Column, etc).
import { DataSource } from "typeorm" // importamos o tipo principal do TypeORM
import { User } from "./entities/User"; //Importamos a entidade de usuários
import * as dotenv from "dotenv"//dotenv permite ler variáveis do .env
dotenv.config()//arrega essas variáveis para que o código possa usá-las.

//criar a conexão com o banco, chamada de AppDataSource.
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    synchronize: true, // Cria tabelas automaticamente (bom para desenvolvimento)
    logging: true, //Mostra no terminal todos os comandos SQL executados
    entities: [User], //Informa quais entidades (tabelas) o TypeORM deve usar.
    subscribers: [],// eventos no banco, os "ouvintes"
    migrations: [__dirname + "/migration/*.js"],//Informa onde estão os arquivos de migration
})

//iniciar a conexão com o banco de dados.
AppDataSource.initialize()
    .then(()  => {
        console.log('Conexão Realizada com Sucesso!')
    }).catch((error) => {
        console.log('Erro na conexão com o banco de dados:', error)
    })