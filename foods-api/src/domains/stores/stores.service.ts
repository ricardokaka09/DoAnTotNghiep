import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { CreateStoresService } from './models/stores.interface';
import { Stores } from './models/stores.schema';

@EntityRepository(Stores)
export class StoresService {
  constructor(
    @InjectRepository(Stores)
    private readonly storesRepository: Repository<Stores>,
  ) {}

  async createOne({ data, user }: CreateStoresService): Promise<Stores> {
    try {
      const payload = {
        ...data,
        createdBy: user.userID,
      };

      const store = await this.storesRepository.save(payload);

      return store;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOne({ query }): Promise<Stores> {
    try {
      const store = await this.storesRepository.findOne({ where: query });

      if (!store) {
        throw new Error('Store is not found');
      }

      return store;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateOne({ query, data, user }): Promise<boolean> {
    try {
      const store = await this.storesRepository.findOne({ where: query });

      if (!store) {
        throw new Error('Store not found');
      }

      await this.storesRepository.update({ storeID: store.storeID }, data);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOne({ query, user }): Promise<boolean> {
    try {
      const store = await this.storesRepository.findOne({ where: query });

      if (!store) {
        throw new Error('Store not found');
      }

      await this.storesRepository.remove(store);

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
