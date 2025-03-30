import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function AddressRoutes(app: FastifyInstance) {
  app.post('/address', create)
}
