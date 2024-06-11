/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../Users/users.service';
import { UsersRepository } from '../Users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../Users/users.entity';


@Module({
    imports:[
        TypeOrmModule.forFeature([User]),
    ],
    controllers:[AuthController],
    providers:[AuthService, UsersService, UsersRepository]
})
export class AuthModule {}