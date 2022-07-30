import { Sequelize } from 'sequelize-typescript'
import { logger } from '../logger/logger';
import { models } from './models';

export async function dbConnection() {
    const sequelize = new Sequelize({
        database: process.env.DB_NAME,
        dialect: 'postgres',
        username: process.env.DB_USER,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        password: process.env.DB_PASSWORD,
        models,
        logging: false
    });
    await sequelize.sync({ force: false }).then(() => logger.info('DATABASE CONNECTED SUCCESSFULLY')).catch(err => console.log(err));
}

