import { makeUpdateProductUseCase } from '@/use-cases/factory/make-update-product-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  })
  const { id } = registerParamsSchema.parse(request.params)
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
    price: z.coerce.number(),
    categories: z
      .array(
        z.object({
          id: z.coerce.number(),
          name: z.string(),
        }),
      )
      .optional(),
  })
  const { name, price, image_url, description, categories } =
    registerBodySchema.parse(request.body)

  const updateProductUseCase = makeUpdateProductUseCase()

  const product = await updateProductUseCase.handler({
    id,
    name,
    price,
    image_url,
    description,
    categories,
  })
  return reply.status(200).send(product)
}
