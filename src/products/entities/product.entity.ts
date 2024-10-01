import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { ProductImage } from "./producst-image.entity";
import { users } from "src/auth/entities/users.entity";

@Entity({name:'products'})
export class Product {

    @ApiProperty({
        example:'28f09e73-3f48-47e5-a026-c4ffa65b0339',
        description: 'Product ID',
        uniqueItems:true
    })
    @PrimaryGeneratedColumn('uuid')
    id:string

    @ApiProperty({
        example:"Remera Oversize4",
        description: 'Title',
    })
    @Column('text',{
        unique:true,
        nullable:false
    })
    title:string

    @ApiProperty({
        example:"99.9",
        description: 'Price',
    })    
    @Column('float',{
        default:0,
        nullable:false
    })
    price:number

    
    @ApiProperty({
        example:"Remera oversize estampada",
        description: 'Description',
    })
    @Column('text',{
        nullable:false
    })
    description: string

    
    @ApiProperty({
        example:"remera_oversize4",
        description: 'Slug',
    })
    @Column('text',{
        unique:true
    })
    slug:string

    
    @ApiProperty({
        example:"20",
        description: 'Stock',
    })
    @Column('int',{
        default:0
    })
    stock:number

    
    @ApiProperty({
        example:['SM','M','XL'],
        description: 'sizes',
        enum:['SM','M','XL']
    })
    @Column('text',{
        array:true
    })
    sizes:string[]

    
    @ApiProperty({
        example:'men',
        description: 'gender',
        enum:['men','women']
    })
    @Column('text')
    gender:string
    
    @ApiProperty({
        example:[],
        description: 'tags',
    })
    @Column('text',{
        array:true,
        default:[]
    })
    tags: string[]

    @ApiProperty({
        example:[
            'https//:image.jpg'
        ],
        description:'Product images'
    })
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade:true,eager:true}
    )
    images?: ProductImage[]

    @ManyToOne(
        () => users,
        (user) => user.products,
        {eager:true}
    )
    user:users

    @BeforeInsert()
    checkSlug(){
        if(!this.slug){
            this.slug = this.title
            .replaceAll(' ','_') 
            .toLowerCase()    
        }
    }

    @BeforeUpdate()
    updateSlug(){
        if(this.slug){
            this.slug = this.slug
            .replaceAll(' ','_')
            .toLowerCase()
        }
    }


}
