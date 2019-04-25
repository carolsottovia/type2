import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsEmail } from 'class-validator'
import { Exclude } from 'class-transformer'
import * as bcrypt from 'bcrypt'

@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', { nullable: false })
  @IsString()
  @MinLength(2)
  @Column('text')
  firstName: string

  @Column('text', { nullable: false })
  @IsString()
  @MinLength(2)
  @Column('text')
  lastName: string

  @Column('text', { nullable: false })
  @IsEmail()
  email: string

  @Column('text')
  @IsString()
  @MinLength(2)
  city: string

  @Column('text')
  @IsString()
  @MinLength(8)
  @Column('text', { nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string


  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    console.log(`thiiiis`, this.password)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    console.log(`raw`, rawPassword)
    console.log(`this`, this.password)
    return bcrypt.compare(rawPassword, this.password)
  }

}