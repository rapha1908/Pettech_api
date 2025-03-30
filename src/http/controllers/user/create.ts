import { MakeCreateUserUseCase } from '@/use-cases/factory/make-create-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  const createUserUseCase = MakeCreateUserUseCase()

  const user = await createUserUseCase.handler({ username, password })

  return replay.status(201).send(user)
}
