import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/users.entity';

@Module({
  imports:[TypeOrmModule.forFeature([users])]
})
export class AuthModule {}
