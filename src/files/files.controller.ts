import {  Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    storage:diskStorage({
      destination:'./static/uploads',
      filename: fileNamer
    })
  }))
  uploadFile(
    @UploadedFile()
    file:Express.Multer.File
  ){
    return {
      originalName : file.originalname
    }
  }
}
