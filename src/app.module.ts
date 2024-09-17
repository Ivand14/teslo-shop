import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

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
    FilesModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    })
  ]
})

export class AppModule {
  constructor(
    private readonly configService:ConfigService
  ){}
}
