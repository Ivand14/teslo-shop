import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed_data';
import { users } from 'src/auth/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {

  constructor(
    private readonly products : ProductsService,
    @InjectRepository(users)
    private readonly userRepository: Repository<users>
  ){}

  async runSeed() {
    await this.deleteTables()
    const user = await this.insertUsers()

    await this.inserNewProducts(user)
    return 'Seed executed, check your database'
  }

  private async deleteTables(){

    await this.products.deleteAllProducts()

    const queryBuilder = this.userRepository.createQueryBuilder()

    await queryBuilder
    .delete()
    .where({})
    .execute()

  }

  
  
  private async insertUsers(){
    
    const userData = initialData.users


    const user: users[] = []
    
    userData.forEach(userInfo => {
      user.push(this.userRepository.create(userInfo))
    })
    
    const dbUser = await this.userRepository.save(userData)
    
    return dbUser[0]
    
  }
  
  private async inserNewProducts(users:users){

    await this.products.deleteAllProducts()

    const prod = initialData.products

    const insetPromises = []

    prod.forEach(prods => {
      insetPromises.push(this.products.create(prods,users))
    })
    
    const seedProds = await Promise.all(insetPromises)
    
    return seedProds
  }
}
