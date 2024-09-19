import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('Users')

  constructor(
    @InjectRepository(users)
    private readonly usersRepository : Repository<users>
  ){}

  async create(createUserDto:createUserDto) {
    
    if(!createUserDto) throw new BadRequestException('An error occurred while creating the user')

    try {
      const user = this.usersRepository.create(createUserDto)
      await this.usersRepository.save(user)
      return user
    } catch (error) {
      this.handleException(error)
    }
  }

  private handleException(error:any):never{
    console.log(error)
    if(error.code === '23505') throw new BadRequestException(error.detail)

    if(error.code === '23502') throw new BadRequestException('One field is missing to complete')
    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected internal error')
  }

}
