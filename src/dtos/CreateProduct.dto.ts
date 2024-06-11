/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    @ApiProperty({
        description:"El nombre del producto debe tener como minimo tres caracateres",
        example:"Tablet Samsung"
    })
    name: string
    
    @IsNotEmpty()
    @IsString()
    @Length(3,100)
    @ApiProperty({
        description:"La descripcion debe ser maximo de 100 caracteres"
    })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description:"El precio es un numero decimal"
    })
    price: number; 

    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        description:"El stock es un numero entero"
    })
    stock: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:"La categoria debe ser una de las ya existentes",
        example:"smartphone"
    })
    category;
}