import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // rota + método que não exigem autenticação
    const routeFreeList = ['POST-/user/signin', 'POST-/user']
    const validateRoute = `${request.method}-${request.url}`

    // Se for criação de usuário, não valida JWT
    if (routeFreeList.includes(validateRoute)) return

    // em todas as outras rotas, verifica o token
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
