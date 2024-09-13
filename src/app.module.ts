import { ConfigModule, ConfigService } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAMEDB,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    FilesModule
  ]
})

export class AppModule {
  constructor(
    private readonly configService:ConfigService
  ){}
}
