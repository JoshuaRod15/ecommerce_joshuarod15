/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Products/products.entity';


@Module({
  imports:[
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository, CloudinaryConfig,]
})
export class FilesModule {}
