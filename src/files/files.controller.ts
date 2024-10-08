import {  Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';

import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService : ConfigService
  ) {}

  @Get('type/:imageName')
  findFile(
    @Res() res: Response,
    @Param('imageName') imageName:string 
  ){
    const path = this.filesService.getStaticImage(imageName)
    res.sendFile(path)
  }


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

    const secureUrl = `${this.configService.get('HOST_API')}/files/type/${file.filename}`

    return {
      secureUrl
    }
  }
}
