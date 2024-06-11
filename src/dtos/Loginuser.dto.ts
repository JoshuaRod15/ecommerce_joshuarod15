/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";


export class LoginUserDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description:"Debe ser un correo valido y existente",
        example:"karen@gmail.com"
    })
    email:string

    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty({
        description:"Debe ser una contraseña fuerte",
        example:"9@52StrongPassword"
    })
    password:string
}