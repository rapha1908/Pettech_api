import { Address } from '@/entities/address'
import { database } from '@/lib/pg/db'

export class AddressRepository {
  async create(address: Address): Promise<Address | undefined> {
    const result = await database.clientInstance?.query<Address>(
      'INSERT INTO address (street, city, state, zip_code, person_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        address.street,
        address.city,
        address.state,
        address.zip_code,
        address.person_id,
      ],
    )
    return result?.rows[0]
  }
}
