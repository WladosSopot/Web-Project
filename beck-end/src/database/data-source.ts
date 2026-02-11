import { dirname, join } from "path";
import { DataSource } from "typeorm";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: process.env.DB_PATH || 'data/dev.sqlite',
    entities: [join(__dirname, '../**/*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations/*.{ts,js}')],
    synchronize: false
});