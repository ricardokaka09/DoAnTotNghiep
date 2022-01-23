import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import supertest from 'supertest';
import { scopes } from '../../constants/scopes';
import { Scopes } from '../../middlewares/authz/authz.service';
import { Users } from '../users/models/users.schema';
import { CreateStoresDto } from './models/stores.dto';
import { Stores, StoreStatus } from './models/stores.schema';
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
  @UseGuards(new Scopes([scopes.ACCEPT_STORE]))
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  async acceptStoreOfRegister(@Request() { user }, @Param() { storeID }) {
    try {
      const store = await this.storesService.findOne({
        query: { storeID },
        credentials: user,
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

      // const update = await this.storesService.updateOne({
      //   data: { ...store, status: StoreStatus.VERIFIED },
      //   user,
      //   query: { storeID: store.storeID },
      // });

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @Get(':storeID')
  @UseGuards(new Scopes([scopes.READ_STORE]))
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Request() { user }, @Param() { storeID }): Promise<Stores> {
    try {
      const store = await this.storesService.findOne({
        query: { storeID },
        credentials: user,
      });

      return store;
    } catch (error) {
      throw error;
    }
  }
}
