import { IProduct } from '@/entities/models/product.interface'
import { IProductRepository } from '../product.repository.interface'
import { Repository } from 'typeorm'
import { Product } from '@/entities/product.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'

export class ProductRepository implements IProductRepository {
  private repository: Repository<Product>

  constructor() {
    this.repository = appDataSource.getRepository(Product)
  }

  create(product: IProduct): Promise<IProduct> {
    return this.repository.save(product)
  }
}
