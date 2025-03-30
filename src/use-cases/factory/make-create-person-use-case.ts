import { PersonRepository } from '@/repositories/person.repository'
import { CreatePersonUseCase } from '../create-person'

export function MakeCreatePersonUseCase() {
  const personRepository = new PersonRepository()
  const createPersonUseCase = new CreatePersonUseCase(personRepository)
  return createPersonUseCase
}
