import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/producst-image.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[
    TypeOrmModule.forFeature([Product,ProductImage]),
    AuthModule
  ],
  exports:[ProductsService,TypeOrmModule]
})
export class ProductsModule {}
