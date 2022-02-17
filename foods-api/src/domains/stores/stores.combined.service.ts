import { Injectable } from '@nestjs/common';
import { buildCongratulationsRegisterStoreSuccess } from '../../helpers/getHtmlTemplate';
import { ConfigService } from '../../configs/configs.service';
import { SendGrid } from '../../helpers/sendMail';
import { RolesUserAccesses, StatusUserAccesses } from '../users/enums/types';
import { UserAccessesService } from '../user_accesses/user_accesses.service';
import { StoresService } from './stores.service';
import { StoreStatus } from './models/stores.schema';

@Injectable()
export class StoresCombinedService {
  constructor(
    private readonly storesService: StoresService,
    private readonly userAccessesService: UserAccessesService,
  ) {}
  private readonly configService = new ConfigService();
  private readonly sendGird = new SendGrid(
    this.configService.sendGridApi,
    this.configService.sendGridSenderDefault,
  );
  async acceptStoreOfRegister({ data, user }) {
    try {
      const store = await this.storesService.updateOne({
        query: { storeID: data.storeID },
        data: {
          status: StoreStatus.VERIFIED,
        },
        credentials: { ...user },
      });

      const { htmlSuccess, subjectSuccess, textSuccess } =
        buildCongratulationsRegisterStoreSuccess();
      await this.sendGird.sendMailSDK({
        mail: {
          html: htmlSuccess,
          to: data.email,
          subject: subjectSuccess,
          text: textSuccess,
        },
      });

      await this.userAccessesService.createOne({
        storeID: data.storeID,
        userID: data.createdBy,
        roleName: RolesUserAccesses.STORE_MANAGER,
        status: StatusUserAccesses.ACCEPTED,
        createdBy: user.userID,
      });

      return store;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
