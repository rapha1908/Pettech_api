export class Address {
  id?: number
  street: string
  city: string
  state: string
  zip_code: string
  person_id?: number

  constructor(
    street: string,
    city: string,
    state: string,
    zip_code: string,
    person_id: number,
  ) {
    this.street = street
    this.city = city
    this.state = state
    this.zip_code = zip_code
    this.person_id = person_id
  }
}
