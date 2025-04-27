export interface ICategoryRepository {
  create(name: string, products?: string[]): Promise<void>
}
