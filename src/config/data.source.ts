import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


dotenv.config({
    path: process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV.trim()}.env `: '.env'
})
const Config : DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Si queremos que busque fuera de un directorio y por nombre de archivo y extensión. El proyecto busca en dif carpetas los archivos con terminación entity.js o entity.ts
    migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(), //userName => user_name
}

export const AppDataSource : DataSource = new DataSource(Config);