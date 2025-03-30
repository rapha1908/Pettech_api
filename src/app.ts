import fastify from 'fastify'
import { PersonRoutes } from '@/http/controllers/person/routes'
import { UserRoutes } from '@/http/controllers/user/routes'
import { globalErrorHandler } from './utils/global-error-handler'

export const app = fastify()

app.register(PersonRoutes)
app.register(UserRoutes)

app.setErrorHandler(globalErrorHandler)
