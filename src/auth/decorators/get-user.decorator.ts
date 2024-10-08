import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const getUser = createParamDecorator(
    (data:string,ctx:ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if(!user)
            throw new InternalServerErrorException('user not found - request')

        
        return data === 'email' ? user.email : user

    }
)