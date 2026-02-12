import { History } from "src/history/history.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, unique: true})
    username: string;

    @Column({select: false})
    password: string;

    @OneToMany(() => History, (history) => history.user)
    history: History[];
}