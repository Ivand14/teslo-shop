import { JwtPayload } from "../interfaces/jwt.interfaces";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { users } from "../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import {  Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(users)
        private readonly usersRepository: Repository<users>,
        configService:ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:JwtPayload): Promise<users> {
        
        const{id} = payload

        const user = await this.usersRepository.findOneBy({id})

        if(!user)
            throw new UnauthorizedException('Token not valid')

        if(!user.isActive)
            throw new UnauthorizedException('user not active')

        return user
        
    }
}