import { Address } from '@/entities/address'
import { Person } from '@/entities/person.entity'

export interface IAddressRepository {
  create(address: Address): Promise<Address | undefined>
  findAddressByPersonId(
    personId: number,
    page: number,
    limit: number,
  ): Promise<(Address & Person)[]>
}
