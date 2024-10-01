import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class Pagination{

    @ApiProperty({
        default:10,
        description:'How many rows you need?'
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Type(() => Number) //Esto es opcional si el enableImplicitConversions:true
    limit?:number
    
    @ApiProperty({
        default:5,
        description:'How many skip you need?'
    })
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    @IsOptional()
    offset?:number
}