import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text',{
        default:true
    })
    isActive:true

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[]
}
