import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function PersonRoutes(app: FastifyInstance) {
  app.post('/person', create)
}
