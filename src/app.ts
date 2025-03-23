import fastify from 'fastify'
import { PersonRoutes } from '@/http/controllers/person/routes'

export const app = fastify()

app.register(PersonRoutes)
