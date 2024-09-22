import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const rawHeaders = createParamDecorator(
    (data,ctx:ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest()
        const rawHeaders = req.rawHeaders
        
        return rawHeaders
    }
)
