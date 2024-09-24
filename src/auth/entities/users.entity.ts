import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { Product } from "src/products/entities/product.entity";

@Entity({name:'users'})
export class users {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{
        unique:true,
        nullable:false
    })
    email:string

    @Column('text',{
        unique:true,
        nullable:false,
        select:false
    })
    password:string

    @Column('text')
    fullName:string

    @Column('boolean',{
        default: false
    })
    isActive:true

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[]

    @OneToMany(
        () => Product,
        (Product) => Product.user
    )
    products: Product

    @BeforeInsert()
    emailToLowerCaseBeforeInsert(){
        this.email = this.email.toLowerCase()
    }

    
    @BeforeUpdate()
    emailToLowerCaseBeforeUpdate(){
        this.email = this.email.toLowerCase()
    }

    
}
