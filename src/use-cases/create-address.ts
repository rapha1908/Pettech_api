import { Address } from '@/entities/address'
import { IAddressRepository } from '@/repositories/address.repository.interface'

export class CreateAddressUseCase {
  constructor(private addressRepository: IAddressRepository) {}

  handler(address: Address) {
    return this.addressRepository.create(address)
  }
}
