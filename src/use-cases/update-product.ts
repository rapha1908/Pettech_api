import { IProduct } from '@/entities/models/product.interface'
import { ProductRepository } from '@/repositories/typeorm/product.repository'

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async handler(product: IProduct) {
    return this.productRepository.update(product)
  }
}
