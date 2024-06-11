/* eslint-disable prettier/prettier */
import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Files')
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService){};

    @ApiBearerAuth()
    @Post('uploadImage/:id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('image'))
    uploadProductImage(@Param('id', ParseUUIDPipe) id: string, @UploadedFile(
        new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: 'The file must be less than 2kb'
                }),
                new FileTypeValidator({
                    fileType: /(jpg|jpeg|png|webp)$/,
                })
            ]
        })
    ) file: Express.Multer.File){
        //return file
        return this.filesService.uploadProductImage(id, file)
    }
}
