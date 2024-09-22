import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorators/get-user.decorator';
import { users } from './entities/users.entity';
import { rawHeaders } from './decorators/rawHeaders.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto:createUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto:loginUserDto) {
    return this.authService.loginUser(loginUserDto)
  }

  @Get('Private')
  @UseGuards(AuthGuard())
  testingToken(
    // @Req() request: Express.Request,
    @getUser() user: users,
    @getUser('email') userEmail:string,
    @rawHeaders() rawHeaders: string[]
  ){
    return {
      ok:true,
      message:'Hola desde private',
      user,
      userEmail,
      rawHeaders
    }
  }

}
