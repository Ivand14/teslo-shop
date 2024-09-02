import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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

    @BeforeInsert()
    checkSlug(){
        if(!this.slug){
            this.slug = this.title
            .replaceAll(' ','_') 
            .toLowerCase()    
        }
    }


}
