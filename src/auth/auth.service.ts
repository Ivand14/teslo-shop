import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  create(createUserDto:createUserDto) {
    return 'This action adds a new auth';
  }
}
