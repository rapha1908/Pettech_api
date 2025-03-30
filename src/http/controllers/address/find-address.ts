import { MakeFindAddressByPerson } from '@/use-cases/factory/make-find-address-by-person'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findAddress(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const registerParamsSchema = z.object({
    personId: z.coerce.number(),
  })

  const registerQuerySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  })

  const { personId } = registerParamsSchema.parse(request.params)
  const { page, limit } = registerQuerySchema.parse(request.query)

  const findAddressByPersonUseCase = MakeFindAddressByPerson()
  const address = await findAddressByPersonUseCase.handler(
    personId,
    page,
    limit,
  )

  return replay.status(200).send(address)
}
