import { CreateProductDto } from './dto/create-product.dto';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, Delete, NotFoundException, Query } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Pagination } from 'src/common/dto/pagination-common.dtos';
import {validate as uuid} from 'uuid'
import { ProductImage } from './entities/producst-image.entity';
import { url } from 'inspector';
import { users } from 'src/auth/entities/users.entity';


@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')


  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,

    private readonly dataSource : DataSource

  ){}
  
  async create(createProductDto: CreateProductDto,user:users) {

    const {images = [], ...productDto} = createProductDto;

    try {

      const product = this.productRepository.create({
        ...productDto,
        images: images.map(url => this.productImageRepository.create({url})),
        user
      })

      await this.productRepository.save(product)
    
      return {...product, images}
    } catch (error) {
      this.handleError(error)
    }
  }

  async findAll(paginationDto:Pagination) {

    const {limit=10,offset=0} = paginationDto

    try {
      const allProd = await this.productRepository.find({
        take:limit,
        skip:offset,
        relations: {
          images: true
        }
      })
      return allProd.map((prod) => ({
        ...prod,
        images: prod.images.map((img) => img.url)
      }))
    } catch (error) {
      this.handleError(error)
    }
  }

  async findOne(term: string) {

    let product : Product


      if(uuid(term) ){
        product = await this.productRepository.findOneBy({id:term})
      }else{
        const queryBuilder =  this.productRepository.createQueryBuilder('prod')
        
        product = await queryBuilder
          .where("UPPER(title) =:title or slug =:slug",{
            title: term.toUpperCase(),
            slug: term.toUpperCase()
          },)
          .leftJoinAndSelect('prod.images','prodImages')
          .getOne()
          
        
      }

      if(!product) 
        throw new NotFoundException(`El producto ${term} no existe`)
      
      return product

  }

  async findOnePlain(term:string){
    console.log(term)
    const {images = [],...rest} = await this.findOne(term)
    console.log(rest)
    return{
      ...rest,
      images: images.map((img) => img.url)
    }

  }

  async update(id: string, updateProductDto: UpdateProductDto,user:users) {

    const {images, ...updateProduct} = updateProductDto

    const product = await this.productRepository.preload({
      id,
      ...updateProduct,
    })

    if(!product) throw new NotFoundException(`Product with id: ${id} not found`)

    //Crear el queryRunner
    const queryRunner =  this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
  
      if(images){
        await queryRunner.manager.delete(ProductImage,{product:{id}})

        product.images = images.map(
          image => this.productImageRepository.create({url:image})
        )
      }
      
      product.user = user
      await queryRunner.manager.save(product)
      await queryRunner.commitTransaction()
      await queryRunner.release()


      return this.findOnePlain(id)
      
    } catch (error) {
      await queryRunner.rollbackTransaction()
      this.handleError(error)
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

  async deleteAllProducts(){
    const query = this.productRepository.createQueryBuilder('product')
    
    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      this.handleError(error)
    }
  
  }

}
