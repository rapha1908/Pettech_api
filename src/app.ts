import fastify from 'fastify'
import { PersonRoutes } from '@/http/controllers/person/routes'
import { UserRoutes } from '@/http/controllers/user/routes'
import { ZodError } from 'zod'
import { env } from 'process'
import { error } from 'console'

export const app = fastify()

app.register(PersonRoutes)
app.register(UserRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV === 'development') {
    console.error(error)
  }

  return reply.status(500).send({
    message: 'Internal server error',
  })
})
