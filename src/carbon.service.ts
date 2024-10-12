import { Injectable, Logger } from '@nestjs/common';
import { Carbon } from 'carbon-now';
import { detect } from 'program-language-detector';
import { format } from 'prettier';

@Injectable()
export class CarbonService {
  async generate(code: string): Promise<string> {
    const logger = new Logger('CarbonService');
    const carbon = new Carbon({
      font: 'Cascadia-Code',
      lineNumbers: true,
    });
    const outputFilePath = 'temp_image.png';
    const lang = detect(code);

    if (lang == 'JavaScript') {
      try {
        code = await format(code, { parser: 'babel' });
      } catch (error) {
        logger.error('Prettier format is failed:', error);
      }
    }

    try {
      const path = await carbon.generate(code.trim(), outputFilePath);
      return path;
    } catch (error) {
      logger.error('Image generation failed', error);
    }
  }
}
