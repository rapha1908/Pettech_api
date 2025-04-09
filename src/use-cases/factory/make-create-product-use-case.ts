import { ProductRepository } from '@/repositories/typeorm/product.repository'
import { CreateProductUseCase } from '../create-product'

export function MakeCreateProductUseCase() {
  const productRepository = new ProductRepository()
  const createProductUseCase = new CreateProductUseCase(productRepository)
  return createProductUseCase
}
