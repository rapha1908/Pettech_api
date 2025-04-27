import { makeFindAllUseCase } from '@/use-cases/factory/make-find-all-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function findAllProducts(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findAllProductParamsSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
  })

  const { page, limit } = findAllProductParamsSchema.parse(request.query)

  const findAllProductsUseCase = makeFindAllUseCase()

  const products = await findAllProductsUseCase.handler(page, limit)

  return reply.status(200).send(products)
}
