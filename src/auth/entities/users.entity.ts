import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @BeforeInsert()
    emailToLowerCaseBeforeInsert(){
        this.email = this.email.toLowerCase()
    }

    
    @BeforeUpdate()
    emailToLowerCaseBeforeUpdate(){
        this.email = this.email.toLowerCase()
    }

    
}
