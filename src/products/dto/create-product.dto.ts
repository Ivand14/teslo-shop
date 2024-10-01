import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength, isArray, isString } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    
    @ApiProperty({
        minLength:1,
        description:'The product title'  
    })
    @IsString()
    @MinLength(1)
    title:string

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?:number
    
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @IsOptional()
    description?:string
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    slug?: string

    @ApiProperty()
    @IsInt()
    @IsOptional()
    @IsPositive()
    stock?: number

    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    sizes: string[]

    @ApiProperty()
    @IsIn(['men','women','kid','unisex'])
    gender:string

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsString({each:true})
    images?:string[]
    
    @ApiProperty()
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags: string[]
    
}
