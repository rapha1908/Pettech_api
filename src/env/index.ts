import 'dotenv/config'

import { z } from 'zod'

// define o que cada variavel deve ser (numero,string...)
const envScheme = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_USER: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_PORT: z.coerce.number(),
})

// faz a validação propriamente dita
const _env = envScheme.safeParse(process.env)

// se der errado
if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())
  // caso as variaveis de ambiente estiverem erradas nao quero que o servidor suba
  throw new Error('Invalid environment variables')
}

// se der certo
export const env = _env.data
