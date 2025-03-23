import { UserRepository } from '@/repositories/user.repository'
import { CreateUserUseCase } from '@/use-cases/create-user'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })

  const { username, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new UserRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    const user = await createUserUseCase.handler({ username, password })

    return replay.status(201).send(user)
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error')
  }
}
