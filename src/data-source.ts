import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entities/Post";
import { Category } from "./entities/Category";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Senha*",
    database: "base",
    synchronize: true,
    logging: true,
    entities: [Post, Category],
    subscribers: [],
    migrations: [],
})