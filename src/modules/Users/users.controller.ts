/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthService } from "../Auth/auth.service";
import { AuthGuard } from "../../guards/auth.guard";
import { Roles } from "../../decorators/roles.decorator";
import { Role } from "../../role.enum";
import { RolesGuard } from "../../guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
@ApiTags('Users')
@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ){}
    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('name') name?: string){
        if(name) return this.usersService.getUserByName(name)
        return this.usersService.getUsers()
    }

    @ApiBearerAuth()
    @Get('admin')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getAdmin(){
        return 'Datos de panel de administrador';
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string){
            return this.usersService.getUserById(id)  
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateuser(@Param('id', ParseUUIDPipe) id: string){
        return id
    }
    
    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id:string){
        return this.usersService.deleteUser(Number(id))
    }

}