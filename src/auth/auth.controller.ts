import { Body, Controller, Delete, Get, Param, Patch, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { createUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from './decorators/get-user.decorator';
import { users } from './entities/users.entity';
import { rawHeaders } from './decorators/rawHeaders.decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { validRoles } from './interfaces/roles.interfaces';
import { Auth } from './decorators/auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({status:200,description:'User created'})
  @ApiResponse({status:404,description:'Missing information'})
  @ApiResponse({status:500,description:'Internal server error'})
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

  @Get('Private2')
  @RoleProtected(validRoles.admin,validRoles.superUser,validRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingGuards(
    // @Req() request: Express.Request,
    @getUser() user: users,
  ){
    return {
      ok:true,
      message:'Hola desde private',
    }
  }

  @Get('Private3')
  @Auth(validRoles.superUser)
  testingCustomDecorators(
    // @Req() request: Express.Request,
    @getUser() user: users,
  ){
    return {
      ok:true,
      message:'Hola desde private',
      user
    }
  }

  @Get('check-auth-status')
  @Auth(validRoles.superUser)
  checkAuthStatus(
    @getUser() user: users
  ){
    return this.authService.checkAuthStatus(user)
  }

}
