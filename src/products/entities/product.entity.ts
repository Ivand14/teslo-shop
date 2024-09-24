import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProductImage } from "./producst-image.entity";
import { users } from "src/auth/entities/users.entity";

@Entity({name:'products'})
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{
        unique:true,
        nullable:false
    })
    title:string

    @Column('float',{
        default:0,
        nullable:false
    })
    price:number

    @Column('text',{
        nullable:false
    })
    description: string

    @Column('text',{
        unique:true
    })
    slug:string

    @Column('int',{
        default:0
    })
    stock:number

    @Column('text',{
        array:true
    })
    sizes:string[]
    
    @Column('text')
    gender:string

    @Column('text',{
        array:true,
        default:[]
    })
    tags: string[]

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
