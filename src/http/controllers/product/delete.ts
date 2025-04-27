import { makeDeleteProductUseCase } from '@/use-cases/factory/make-delete-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteProduct(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestParamsSchema = z.object({
    id: z.coerce.string(),
  })

  const { id } = requestParamsSchema.parse(request.params)

  const deleteProductUseCase = makeDeleteProductUseCase()

  await deleteProductUseCase.handler(id)

  return reply.status(204).send()
}
