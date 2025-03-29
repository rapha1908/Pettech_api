import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/user', create)
}
