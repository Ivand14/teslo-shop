import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed_data';

@Injectable()
export class SeedService {

  constructor(
    private readonly products : ProductsService
  ){}

  async runSeed() {
    await this.inserNewProducts()
    return 'Seed executed, check your database'
  }

  private async inserNewProducts(){

    await this.products.deleteAllProducts()

    const prod = initialData.products

    const insetPromises = []

    prod.forEach(prods => {
      insetPromises.push(this.products.create(prods))
    })
    
    const seedProds = await Promise.all(insetPromises)
    
    return seedProds
  }

}
