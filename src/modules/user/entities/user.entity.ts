import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserShortDto } from '../dto/user-short.dto';
import { UserPutResponseDto } from '../dto/user-put-response.dto';
import { UserDto } from '../dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30, unique: true })
  name: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  async toDto(): Promise<UserDto> {
    return {
      email: this.email,
      name: this.name,
    };
  }

  toUserPutResponseDto(): UserPutResponseDto {
    return {
      email: this.email,
      name: this.name,
    };
  }
}
