import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

import { Type } from "class-transformer";

export class Pagination{
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number) //Esto es opcional si el enableImplicitConversions:true
    limit?:number
    
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @IsOptional()
    offset?:number
}