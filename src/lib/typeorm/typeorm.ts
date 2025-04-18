import { DataSource } from 'typeorm'

import { env } from '@/env'
import { ProductAutoGenerateUUID1744977784424 } from './migration/1744977784424-ProductAutoGenerateUUID'

export const appDataSource = new DataSource({
  type: 'postgres',
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: ['src/entities/*.ts'],
  migrations: [ProductAutoGenerateUUID1744977784424],
  logging: env.NODE_ENV === 'development',
})

appDataSource
  .initialize()
  .then(() => {
    console.log('Database connection established')
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error)
  })
