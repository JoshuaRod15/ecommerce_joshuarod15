/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsEmail, IsInt, Length, IsStrongPassword} from 'class-validator'
import { Match } from 'src/decorators/validatePassword.decorator'

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    @ApiProperty({
        description:"El nombre del usuario debe tener como minimo tres caracateres",
        example:"Pepe"
    })
    name:string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description:"El email debe ser un email valido",
        example:"Pepe@gmail.com"
    })
    email: string

    @IsNotEmpty()
    @IsStrongPassword({
        minSymbols:1
    })
    @ApiProperty({
        description:"La contraseña debe ser una contraseña fuerte",
        example:"9@52StrongPassword"
    })
    password:string

    @IsNotEmpty()
    @Match('password',{
        message: 'La verificacion de contraseña debe ser igual a la contraseña'
    })
    @ApiProperty({
        description:"La verificaion de la contraseña debe ser igual a la contraseña",
        example:"9@52StrongPassword"
    })
    verifyPassword:string

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description:"El telefono debe ser valido",
        example:"5653184706"
    })
    phone:number

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    @ApiProperty({
        example:"Mexico"
    })
    country:string

    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    @ApiProperty({
        example:"Av. de los maestros, 570 El dorado"
    })
    address: string;

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    @ApiProperty({
        example:"Aguascalientes"
    })
    city: string;
}