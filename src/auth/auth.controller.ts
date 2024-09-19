import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';

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

}
