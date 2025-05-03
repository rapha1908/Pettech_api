import { IPerson } from '@/entities/models/person.interface'
import { IUser } from '@/entities/models/user.interface'

export interface IUserRepository {
  findWithPerson(id: number): Promise<(IUser & IPerson) | undefined>
  findByUsername(username: string): Promise<IUser | undefined>
  create(user: IUser): Promise<IUser | undefined>
}
