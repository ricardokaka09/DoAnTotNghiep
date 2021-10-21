import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stores } from './models/stores.schema';
import { StoresCombinedService } from './stores.combined.service';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

const storesRepository = TypeOrmModule.forFeature([Stores]);
@Module({
  imports: [storesRepository],
  controllers: [StoresController],
  providers: [StoresService, StoresCombinedService],
})
export class StoresModule {}
