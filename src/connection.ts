import { Sequelize } from 'sequelize';

const config = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
}

export const sequelize = new Sequelize(
    config.database!,
    config.username!,
    config.password,
    {
        host: config.host,
        dialect: config.dialect as any,
    },
);
