import { FastifyReply, FastifyRequest } from 'fastify'

export async function validateJwt(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // rota + método que não exigem autenticação
    const route = request.routerPath
    const method = request.method

    // Se for criação de usuário, não valida JWT
    if (route === '/user' && method === 'POST') {
      return
    }

    // em todas as outras rotas, verifica o token
    await request.jwtVerify()
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
