import { Injectable, Logger } from '@nestjs/common';
import { Carbon } from 'carbon-now';

@Injectable()
export class CarbonService {
  async generate(code: string): Promise<string> {
    const logger = new Logger('CarbonService');
    const carbon = new Carbon({
      font: 'Cascadia-Code',
      lineNumbers: true,
    });
    const outputFilePath = 'public/temp_image.png';

    try {
      const path = await carbon.generate(code, outputFilePath);
      logger.verbose('Code image created');
      return path;
    } catch (error) {
      logger.error('Image generation failed', error);
    }
  }
}
