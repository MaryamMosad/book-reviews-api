import 'dotenv/config'
import { startApolloServer } from './server'
import { dbConnection } from './src/common/database/db-config'

const app = startApolloServer()
dbConnection();