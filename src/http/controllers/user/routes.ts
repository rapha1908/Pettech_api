import { FastifyInstance } from 'fastify'
import { create } from './create'
import { findUser } from './find'

export async function UserRoutes(app: FastifyInstance) {
  app.post('/user', create)
  app.get('/user/:id', findUser)
}
