import { CreateProductDto } from './dto/create-product.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, Delete, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Pagination } from 'src/common/dto/pagination-common.dtos';
import {validate as uuid} from 'uuid'
import { NotFoundError } from 'rxjs';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}
  
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto)
      await this.productRepository.save(product)
    
      return product
    } catch (error) {
      this.handleError(error)
    }
  }

  async findAll(paginationDto:Pagination) {

    const {limit=10,offset=0} = paginationDto

    try {
      const allProd = await this.productRepository.find({
        take:limit,
        skip:offset
      })
      return allProd
    } catch (error) {
      this.handleError(error)
    }
  }

  async findOne(term: string) {

    let product : Product


      if(uuid(term) ){
        product = await this.productRepository.findOneBy({id:term})
      }else{
        const queryBuilder =  this.productRepository.createQueryBuilder()
        
        product = await queryBuilder
          .where("UPPER(title) =:title or slug =:slug",{
            title: term.toUpperCase(),
            slug: term.toUpperCase()
          },).getOne()
          
        
      }

      if(!product) 
        throw new NotFoundException(`El producto ${term} no existe`)
      
      return product

  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const prod = await this.findOne(id)
      if(prod){
        // await this.productRepository.update()
      }
    } catch (error) {
      
    }
  }

  async remove(id: string) {
    
    try {
      const prod =  await this.findOne(id)
      if(prod) await this.productRepository.delete({id:prod.id})
      return `El producto: ${prod.title}, fue eliminado`
    } catch (error) {
      this.handleError(error)
    }

  }

  private handleError(error:any){

    console.log(error)
    if(error.code === '23505') throw new BadRequestException(error.detail)

    if(error.code === '23502') throw new BadRequestException('One field is missing to complete')
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected internal error')
  }

}
