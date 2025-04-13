import { MakeCreateProductUseCase } from '@/use-cases/factory/make-create-product-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
    price: z.coerce.number(),
    categories: z.array(
      z
        .object({
          id: z.coerce.number(),
          name: z.string(),
        })
        .optional(),
    ),
  })

  const { name, price, image_url, description, categories } =
    registerBodySchema.parse(request.body)

  const createProductUseCase = MakeCreateProductUseCase()

  const product = await createProductUseCase.handler({
    name,
    price,
    image_url,
    description,
    categories,
  })

  return reply.status(201).send(product)
}
