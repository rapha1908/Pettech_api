import { Person } from '@/entities/person.entity'
import { database } from '@/lib/pg/db'
import { IPersonRepository } from '../person.repository.interface'

export class PersonRepository implements IPersonRepository {
  async create(person: Person): Promise<Person | undefined> {
    const result = await database.clientInstance?.query<Person>(
      'INSERT INTO person (cpf, name, birth, email, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [person.cpf, person.name, person.birth, person.email, person.user_id],
    )
    return result?.rows[0]
  }
}
