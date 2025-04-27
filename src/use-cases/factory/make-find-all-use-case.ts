import { ProductRepository } from '@/repositories/typeorm/product.repository'
import { FindAllProductsUseCase } from '../find-all-products'

export function makeFindAllUseCase() {
  const productRepository = new ProductRepository()
  const findAllUseCase = new FindAllProductsUseCase(productRepository)
  return findAllUseCase
}
