import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { users } from './entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { loginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.interfaces';


@Injectable()
export class AuthService {

  private readonly logger = new Logger('Users')

  constructor(
    @InjectRepository(users)
    private readonly usersRepository : Repository<users>,

    private readonly jwtService : JwtService

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

      return {
        ...user,
        token: this.getJwt({id: user.id})
      }

    } catch (error) {

      this.handleException(error)

    }
  }

  async loginUser(loginUserDto:loginUserDto){

      const {email,password} = loginUserDto

      const user = await this.usersRepository.findOne(
        {
          where:{email},
          select:{email:true,password:true,id:true}
        }
      )
      
      if(!user) 
        throw new UnauthorizedException('Not valid credentials - email')

      if(!bcrypt.compareSync(password,user.password)){
        throw new UnauthorizedException('Not valid credentials - password')
      }

      return {
        ...user,
        token: this.getJwt({id: user.id})
      }
  }

  private getJwt(payload: JwtPayload){
    const token =  this.jwtService.sign(payload)
    return token
  }


  private handleException(error:any):never{

    if(error.code === '23505') throw new BadRequestException(error.detail)

    if(error.code === '23502') throw new BadRequestException('One field is missing to complete')

    
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected internal error')
  }

}
