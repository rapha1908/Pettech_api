import { UserRepository } from '@/repositories/pg/user.repository'
import { SigninUseCase } from '../signin'

export function MakeSignInUseCase() {
  const userRepository = new UserRepository()
  const signInUseCase = new SigninUseCase(userRepository)
  return signInUseCase
}
