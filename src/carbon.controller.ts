import {
  Controller,
  Get,
  Query,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CarbonService } from './carbon.service';
import { Response } from 'express';

@Controller('carbon')
export class CarbonController {
  constructor(private readonly carbonService: CarbonService) {}

  @Get('generate')
  async generateImage(@Query('code') code: string, @Res() res: Response) {
    if (!code) {
      throw new HttpException('Code is required', HttpStatus.BAD_REQUEST);
    }

    try {
      // Code'u carbon-now ile image'e çevir
      const imagePath = await this.carbonService.generate(code);

      // Resim dosyasını geri döndür
      res.sendFile(imagePath); // Bu root, projenizin kök dizinidir
    } catch (error) {
      throw new HttpException(
        'Failed to generate image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
