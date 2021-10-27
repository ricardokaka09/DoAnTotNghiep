import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateStoresDto } from './models/stores.dto';
import { StoreStatus } from './models/stores.schema';
import { StoresCombinedService } from './stores.combined.service';
import { StoresService } from './stores.service';

@Controller('stores')
@ApiTags('Stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly storesCombinedService: StoresCombinedService,
  ) {}

  @Post('register')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async createStore(@Body() data: CreateStoresDto, @Request() { user }) {
    try {
      const store = await this.storesService.createOne({
        data: { ...data, status: StoreStatus.UNVERIFIED },
        user,
      });

      return store;
    } catch (error) {
      throw error;
    }
  }

  @Post('/:storeID/accept')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async acceptStoreOfRegister(@Request() { user }, @Param() storeID) {
    try {
      const store = await this.storesService.findOne({
        query: { storeID },
      });

      if (!store) {
        return Promise.reject({
          error: 404,
          messages: 'store is not Found',
        });
      }

      await this.storesCombinedService.acceptStoreOfRegister({
        data: { ...store, status: StoreStatus.VERIFIED },
        user,
      });

      const update = await this.storesService.updateOne({
        data: { ...store, status: StoreStatus.VERIFIED },
        user,
        query: { storeID: store.storeID },
      });

      return update;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
