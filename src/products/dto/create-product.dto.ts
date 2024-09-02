import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MinLength } from "class-validator";

export class CreateProductDto {
    
    @IsString()
    @MinLength(1)
    title:string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?:number
    
    @IsString()
    @MinLength(1)
    @IsOptional()
    description?:string

    @IsString()
    @IsOptional()
    slug?: string

    @IsInt()
    @IsOptional()
    @IsPositive()
    stock?: number

    @IsString({each:true})
    @IsArray()
    sizes: string[]

    @IsIn(['men','women','kid','unisex'])
    gender:string
    
}
