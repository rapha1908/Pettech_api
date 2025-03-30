import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  handler(user: User): Promise<User | undefined> {
    return this.userRepository.create(user)
  }
}
