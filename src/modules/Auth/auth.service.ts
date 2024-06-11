/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../Users/users.service";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from "src/dtos/CreateUser.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../Users/users.entity";
import { LoginUserDto } from "src/dtos/Loginuser.dto";
import { JwtService } from "@nestjs/jwt";
import { Role } from "../../role.enum";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ){}
    
    async signUp(user:CreateUserDto){
        const isRegistered = await this.usersRepository.findOne({
            where:({email:user.email})
        })
        console.log(isRegistered);
        
        if(isRegistered)throw new BadRequestException('Email alrready exist')
        if(user.password === user.verifyPassword){
            const hashedPassword = await bcrypt.hash(user.password, 10);
            !hashedPassword && (()=>{throw new BadRequestException('Password could not be hashed')})();
            user.password = hashedPassword
            await this.userService.createUser(user)
            return "User created succesfully"
        }
        throw new BadRequestException('passwords must match');
    }

    async signIn(credentials:LoginUserDto){
        const userCredentials = await this.usersRepository.findOne({
            where:({email:credentials.email}),
            select:["id","email","password","isadmin"]
        })
        if(userCredentials){
            const validate = await bcrypt.compare(credentials.password, userCredentials.password)
            if(validate){
            const userPayload = {
                sub:userCredentials.id,
                id:userCredentials.id,
                email:userCredentials.email,
                roles: [ userCredentials.isadmin? Role.Admin : Role.User]
            }  

            const token = this.jwtService.sign(userPayload);
            return {
                message: 'User logged in successfully',
                token,
            }

        }
        throw new UnauthorizedException('email or password incorrect')
        }
    }
}