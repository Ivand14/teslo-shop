import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { loginUserDto } from './dto/login-user.dto';


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
      const {password,...userData} = createUserDto

      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password,10)
      })

      await this.usersRepository.save(user)
      delete user.password
      //TODO: Devolver el JWT de acceso
      return user

    } catch (error) {

      this.handleException(error)

    }
  }

  async loginUser(loginUserDto:loginUserDto){

      const {email,password} = loginUserDto

      const user = await this.usersRepository.findOne(
        {
          where:{email},
          select:{email:true,password:true}
        }
      )
      
      if(!user) 
        throw new UnauthorizedException('Not valid credentials - email')

      if(!bcrypt.compareSync(password,user.password)){
        throw new UnauthorizedException('Not valid credentials - password')
      }

      return user
      //TODO: Retornar JWT
      
    
  }


  private handleException(error:any):never{
    console.log(error)
    if(error.code === '23505') throw new BadRequestException(error.detail)

    if(error.code === '23502') throw new BadRequestException('One field is missing to complete')

    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected internal error')
  }

}
