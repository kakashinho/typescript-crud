//Importando recursos do TypeORM
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// Define a tabela users com seus campos (entidade TypeORM).
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true})
    email: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updateAt!: Date
}
// Semelhante ao comando no MySQL:
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );