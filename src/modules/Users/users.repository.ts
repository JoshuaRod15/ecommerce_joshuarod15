/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/CreateUser.dto";
import { LoginUserDto } from "src/dtos/Loginuser.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository{
    constructor( 
        @InjectRepository(User) private usersRepository: Repository<User>){}
    private users = [{
        "id":1,
        "email":"Joshua@mail.com",
        "name":"Joshua",
        "password":"Joshua123",
        "address":"Aguascalienes, Ags",
        "phone":"123456",
        "country":"Mexico",
        "city":"Aguscalientes" 
    },
    {
        "id": 2,
        "email": "maria@mail.com",
        "name": "Maria",
        "password": "Maria456",
        "address": "Guadalajara, Jal",
        "phone": "654321",
        "country": "Mexico",
        "city": "Guadalajara"
    },
    {
        "id": 3,
        "email": "carlos@mail.com",
        "name": "Carlos",
        "password": "Carlos789",
        "address": "Monterrey, NL",
        "phone": "987654",
        "country": "Mexico",
        "city": "Monterrey"
    },
    {
        "id": 4,
        "email": "ana@mail.com",
        "name": "Ana",
        "password": "Ana012",
        "address": "Ciudad de Mexico, CDMX",
        "phone": "012345",
        "country": "Mexico",
        "city": "Ciudad de Mexico"
    }
]

    async getUsers(){
        return await this.usersRepository.find({
            relations:{
                orders:true
            }
        })
    }

    async getUserById(id:string){
        const user = await this.usersRepository.findOne({
            where:({id:id}),
            relations:{
                orders:true
            }
        })
        !user && (() => { throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST) })();
        return user
    }

    async getUserByName(name: string){
        const user = await this.usersRepository.findOne({
            where:({name:name}),
            relations:{
                orders:true,
            }
        })
        !user && (() => { throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST) })();
        return user
    }
    async createUser(user: CreateUserDto){
        const userCreated = await this.usersRepository.save(user);
        return userCreated
    } 

    async deleteUser(id:number){
        this.users = this.users.filter((user) => user.id !== id)
        return id
    }

    async userLogin(credentials: LoginUserDto){
        const user = await this.usersRepository.findOne({
            where:({email:credentials.email}),
            select:["id","email", "password"]
        })
        if(user){
            const validate = await bcrypt.compare(credentials.password, user.password)
            if(validate === true){
                return user.id
            }
        }
        throw new UnauthorizedException('email or password incorrect')
    }
}