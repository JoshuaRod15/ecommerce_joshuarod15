/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../../dtos/Loginuser.dto";
import { CreateUserDto } from "../../dtos/CreateUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}
    @Post('signup')
    createUser(@Body() user: CreateUserDto){
        //return user
        return this.authService.signUp(user)
    }

    @Post('signin')
    userLogin(@Body() credentials: LoginUserDto){
        return this.authService.signIn(credentials)
    }

}