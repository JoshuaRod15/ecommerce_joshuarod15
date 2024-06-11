/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDto } from "src/dtos/CreateUser.dto";
import { LoginUserDto } from "src/dtos/Loginuser.dto";


@Injectable()
export class UsersService{
    constructor (private readonly usersRespository: UsersRepository){}
    async getUsers(){
        return this.usersRespository.getUsers()
    }

    async getUserById(id: string){
            return this.usersRespository.getUserById(id)
    }

    async getUserByName(name: string){
        return this.usersRespository.getUserByName(name)
    }
    
    async createUser(user: CreateUserDto){
        const userCreated = await this.usersRespository.createUser(user);
        return userCreated
    }

    async deleteUser(id: number){
        const deleteduser = this.usersRespository.deleteUser(id)
        return deleteduser
    }

    async userLogin(credentials: LoginUserDto){
        const userLogged = this.usersRespository.userLogin(credentials);
        return userLogged
    }
}