import { DeleteResult, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BaseServise } from '../../config/base.service';
import { RoleType, UserDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserService extends BaseServise<UserEntity> {

    constructor() {
        super(UserEntity);
    }

    async findAllUser(): Promise<UserEntity[]>{
        return ( await this.execRepository ).find();
    }
    async findUserById(id:string): Promise<UserEntity | null>{
        return (await this.execRepository).findOneBy({ id });
    }
    async findUserWithRelation(id:string): Promise<UserEntity | null> {
        return (await this.execRepository)
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.customer','customer')
        .where({id})
        .getOne()
    }
    async findUserByEmail(email:string): Promise<UserEntity | null>{
        return (await this.execRepository)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where({ email })
                .getOne()     
    }
    async findUserByRole(id:string, role:RoleType): Promise<UserEntity | null>{
        return (await this.execRepository)
                .createQueryBuilder('user')
                .addSelect('user.password')
                .where({ id })
                .andWhere({ role })
                .getOne()     
    }
    async findUserByUserName(userName:string): Promise<UserEntity | null>{
        return (await this.execRepository)
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ userName })
        .getOne()
    }
    async createUser(body: UserDTO): Promise<UserEntity>{
        const newUser = (await this.execRepository).create(body);
        const hash = await bcrypt.hash(newUser.password, 10);
        newUser.password = hash;
        return (await this.execRepository).save(newUser)
    }
    async deleteUser(id:string): Promise<DeleteResult>{
        return (await this.execRepository).delete({id})
    }
    async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult>{
        return (await this.execRepository).update(id, infoUpdate)
    }

}