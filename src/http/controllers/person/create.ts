import { PersonRepository } from '@/repositories/person.repository'
import { CreatePersonUseCase } from '@/use-cases/create-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    cpf: z.string(),
    name: z.string(),
    birth: z.coerce.date(),
    email: z.string().email(),
    user_id: z.coerce.number(),
  })

  const { cpf, name, birth, email, user_id } = registerBodySchema.parse(
    request.body,
  )

  try {
    const personRepository = new PersonRepository()
    const createPersonUseCase = new CreatePersonUseCase(personRepository)

    const person = await createPersonUseCase.handler({
      cpf,
      name,
      birth,
      email,
      user_id,
    })

    return replay.status(201).send(person)
  } catch (error) {
    console.error(error)
    throw new Error('Internal server error')
  }
}
