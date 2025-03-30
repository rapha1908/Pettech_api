import { Address } from '@/entities/address'

export interface IAddressRepository {
  create(address: Address): Promise<Address | undefined>
}
