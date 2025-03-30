import { FindAddressByPersonPersonUseCase } from '../find-address-by-person'
import { AddressRepository } from '@/repositories/pg/address.repository'

export function MakeFindAddressByPerson() {
  const addressRepository = new AddressRepository()
  const findAddressByPersonUseCase = new FindAddressByPersonPersonUseCase(
    addressRepository,
  )
  return findAddressByPersonUseCase
}
