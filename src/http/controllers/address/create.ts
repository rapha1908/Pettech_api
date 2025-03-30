import { MakeCreateAddressUseCase } from '@/use-cases/factory/make-create-address-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    street: z.string(),
    city: z.string(),
    zip_code: z.string(),
    state: z.string(),
    person_id: z.coerce.number(),
  })

  const { street, city, zip_code, state, person_id } = registerBodySchema.parse(
    request.body,
  )

  const createAddressUseCase = MakeCreateAddressUseCase()

  const address = await createAddressUseCase.handler({
    street,
    city,
    zip_code,
    state,
    person_id,
  })

  return replay.status(201).send(address)
}
