import 'reflect-metadata'
import '@/lib/typeorm/typeorm'
import fastify from 'fastify'
import { PersonRoutes } from '@/http/controllers/person/routes'
import { UserRoutes } from '@/http/controllers/user/routes'
import { globalErrorHandler } from './utils/global-error-handler'
import { AddressRoutes } from './http/controllers/address/routes'
import { productRoutes } from './http/controllers/product/routes,'
import { categoryRoutes } from './http/controllers/category/routes'
import fastifyJwt from '@fastify/jwt'
import { validateJwt } from './http/middlewares/jwt-validate'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: { expiresIn: '10m' },
})

app.addHook('onRequest', validateJwt)

app.register(PersonRoutes)
app.register(UserRoutes)
app.register(AddressRoutes)
app.register(productRoutes)
app.register(categoryRoutes)

app.setErrorHandler(globalErrorHandler)
