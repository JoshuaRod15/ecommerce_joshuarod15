/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from "typeorm"
import {config as dotenvconfig} from 'dotenv'
import { registerAs } from "@nestjs/config"

dotenvconfig({path: '.env.development'})
const config= {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    //dropSchema: true,
    //entities: [User, Product, Category, Order, OrderDetail],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.js,.ts}']
  }

  export default registerAs('typeorm', () => config)
  export const connectionSource = new DataSource(config as DataSourceOptions)