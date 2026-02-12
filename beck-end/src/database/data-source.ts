import { join } from "path";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DB_PATH || join(__dirname, 'data/dev.sqlite'),
    entities: [join(__dirname, '../**/*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    synchronize: false
});