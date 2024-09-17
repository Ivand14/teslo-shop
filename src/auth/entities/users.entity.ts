import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'Users'})
export class users {
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('text',{
        unique:true,
        nullable:false
    })

    @Column('text',{
        unique:true,
        nullable:false,
    })
    email:string

    @Column('text')
    password:string

    @Column('boolean')
    isActive:boolean
    
    @Column('text')
    fullName:string

    @Column('text',{
        array:true
    })
    roles:string[]
    
}
