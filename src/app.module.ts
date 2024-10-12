import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarbonController } from './carbon.controller';
import { CarbonService } from './carbon.service';

@Module({
  imports: [],
  controllers: [AppController, CarbonController],
  providers: [AppService, CarbonService],
})
export class AppModule {}
