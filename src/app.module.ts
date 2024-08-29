import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot()
  ]
})

export class AppModule {
  constructor(
    private readonly configService:ConfigService
  ){}
}
