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
      await this.carbonService.generate(code);
      res.send('Image generated ');
      HttpStatus.ACCEPTED;
    } catch (error) {
      throw new HttpException(
        'Failed to generate image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
