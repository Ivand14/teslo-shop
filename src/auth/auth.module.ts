import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/users.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([users]),
    PassportModule.register({defaultStrategy:'jwt'}),
    
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService:ConfigService) => {
        return{
          secret:configService.get('JWT_SECRET'),
          signOptions:{
            'expiresIn':'1h'
    }
        }
      }
    })
  ],
  exports:[JwtStrategy,TypeOrmModule,PassportModule,JwtModule]
})
export class AuthModule {}
