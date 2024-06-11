/* eslint-disable prettier/prettier */
import { Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from '../Auth/auth.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([User])
    ],
    controllers:[UsersController],
    providers:[UsersService, UsersRepository, AuthService]
})
export class UsersModule{

}
