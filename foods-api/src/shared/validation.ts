import { getIDsInObject } from '../helpers/helper';

export interface Credentials {
  userID?: string;
  phoneNumber?: string;
  email?: string;
  roles?: string[];
  hasPersonalScopes?: boolean;
  hasSecondGroupScopes?: boolean;
  hasFirstGroupScopes?: boolean;
  status?: string;
  secondGroupIDs?: string[];
  firstGroupIDs?: string[];
  isAdmin?: boolean;
  isPublic?: boolean;
}
export interface ValidateAccessToSingle<T> {
  data: T;
  credentials: Credentials;
}
export interface ValidateAccessToList<T> {
  data: T[];
  credentials: Credentials;
}

export class AccessValidator {
  personalKey: string[];
  firstGroupKey: string[];
  secondGroupKey: string[];
  thirdGroupKey: string[];
  fourthGroupKey: string[];
  firstGroupKeyNameForIDs: string;
  secondGroupKeyNameForIDs: string;
  thirdGroupKeyNameForIDs: string;
  fourthGroupKeyNameForIDs: string;
  firstGroupKeyNameForScopes: string;
  secondGroupKeyNameForScopes: string;
  thirdGroupKeyNameForScopes: string;
  fourthGroupKeyNameForScopes: string;
  validateAccessToList: <T>({ data, credentials }: ValidateAccessToList<T>) => {
    validData: (T | null)[];
    validDataLength: number;
  };
  constructor(
    personalKey: string[] = ['createdBy'],
    firstGroupKey: string[] = ['storeID'],
    firstGroupKeyNameForIDs = 'storeIDs',
    secondGroupKey?: string[],
    thirdGroupKey?: string[],
    fourthGroupKey?: string[],
    secondGroupKeyNameForIDs?: string,
    thirdGroupKeyNameForIDs?: string,
    fourthGroupKeyNameForIDs?: string,
    firstGroupKeyNameForScopes = 'hasStoreScopes',
    secondGroupKeyNameForScopes?: string,
    thirdGroupKeyNameForScopes?: string,
    fourthGroupKeyNameForScopes?: string,
  ) {
    this.personalKey = personalKey;
    this.firstGroupKey = firstGroupKey;
    this.firstGroupKeyNameForIDs = firstGroupKeyNameForIDs;
    this.firstGroupKeyNameForScopes = firstGroupKeyNameForScopes;
  }
  preProcess = ({ credentials }: { credentials: Credentials }) => {
    // tslint:disable-next-line:no-string-literal
    const firstGroupIDs = credentials['storeScopes'] || [];
    const hasFirstGroupScopes =
      credentials[this.firstGroupKeyNameForScopes] || false;
    return {
      firstGroupIDs,
      hasFirstGroupScopes,
      userID: credentials.userID,
      isAdmin: credentials.isAdmin || false,
      isPublic: credentials.isPublic || false,
      hasPersonalScopes: credentials.hasPersonalScopes || false,
    };
  };
  getPersonalIDs = (data) => {
    const personalIDs = getIDsInObject({
      data,
      keys: this.personalKey,
    });
    return personalIDs;
  };
  getFirstGroupIDs = (data) => {
    const firstGroupID = getIDsInObject({
      data,
      keys: this.firstGroupKey,
    });
    return firstGroupID;
  };
  getSecondGroupIDs = (data) => {
    const secondGroupID = getIDsInObject({
      data,
      keys: this.secondGroupKey,
    });
    return secondGroupID;
  };
  getThirdGroupIDs = (data) => {
    const thirdGroupID = getIDsInObject({
      data,
      keys: this.thirdGroupKey,
    });
    return thirdGroupID;
  };
  getFourthGroupIDs = (data) => {
    const fourthGroupID = getIDsInObject({
      data,
      keys: this.fourthGroupKey,
    });
    return fourthGroupID;
  };
  validatePersonal = ({ data, userID, hasPersonalScopes }) => {
    const personalIDsFormat = this.getPersonalIDs(data);
    const isOwned =
      userID &&
      (personalIDsFormat === null || personalIDsFormat === []
        ? []
        : personalIDsFormat.includes(userID)) &&
      hasPersonalScopes;
    return isOwned;
  };
  validateFirstGroup = ({ data, firstGroupIDs, hasFirstGroupScopes }) => {
    const firstGroupIDsFromData = this.getFirstGroupIDs(data);
    const isInFirstGroup =
      firstGroupIDsFromData.find((each) => firstGroupIDs[`${each}`]) &&
      hasFirstGroupScopes;
    return isInFirstGroup ? true : false;
  };
  validateSecondGroup = ({ data, secondGroupIDs, hasSecondGroupScopes }) => {
    const secondGroupIDsFromData = this.getSecondGroupIDs(data);
    const isInSecondGroup =
      secondGroupIDsFromData.some((eachID) =>
        secondGroupIDs.includes(eachID),
      ) && hasSecondGroupScopes;
    return isInSecondGroup;
  };

  validateAccessToSingle = ({ data, credentials }) => {
    if (!data || Array.isArray(data)) {
      return {
        validData: null,
      };
    }
    const {
      firstGroupIDs,
      hasFirstGroupScopes,
      userID,
      isAdmin,
      isPublic,
      hasPersonalScopes,
    } = this.preProcess({ credentials });
    if (isAdmin || isPublic) {
      return {
        validData: data,
      };
    }
    const isInFirstGroup = this.validateFirstGroup({
      data,
      firstGroupIDs,
      hasFirstGroupScopes,
    });
    if (isInFirstGroup) {
      return {
        validData: data,
      };
    }
    const isOwned = this.validatePersonal({ data, userID, hasPersonalScopes });
    if (isOwned) {
      return {
        validData: data,
      };
    }
    if (!isOwned && !isInFirstGroup) {
      throw {
        code: 403,
        name: 'ValidationError',
      };
    }
    throw {
      code: 403,
      name: 'ValidationError',
    };
  };
}

// export interface Credentials {
//   userId: string;
//   email?: string;
//   isAdmin?: string | boolean;
//   isPublic?: string | boolean;
//   validRoles: string[];
//   hasStoreRoles: boolean;
//   permissions: Permissions[];
// }
/*
interface ValidatePlanAccessToSingle {
  data;
  credentials: Credentials;
  allowedCustomerIDs?: string[];
  shouldCheckStatus?: boolean;
}

interface ValidatePlanAccessToList {
  data;
  credentials: Credentials;
  allowedCustomerIDs?: string[];
  isPublicForCoach?: boolean;
}

export const validateAccessToSingle = ({ data, credentials }) => {
  if (!credentials) {
    throw {
      code: 403,
      name: 'ValidationError',
    };
  }

  const { isAdmin, isPublic, userId, hasStoreRoles }: Credentials = credentials;

  if (!data || isAdmin || isPublic) {
    return data;
  }

  const dataUserId =
    typeof data?.userId === 'string' ? data.userId : data.userId?.userId;
  const createdBy =
    typeof data?.createdBy === 'string'
      ? data.createdBy
      : data.createdBy?.userId;

  const ownerIds = [dataUserId, createdBy];

  const isOwner = ownerIds.includes(userId);

  if (isOwner) {
    return data;
  }

  if (hasStoreRoles) {
    return data;
  }

  throw {
    code: 403,
    name: 'ValidationError',
  };
};

export const validateAccessToList = ({ data, credentials }) => {
  if (!credentials) {
    throw {
      code: 403,
      name: 'ValidationError',
    };
  }

  const { isAdmin, isPublic, userId, hasStoreRoles } = credentials;

  if (!data?.length || isAdmin || isPublic) {
    return {
      validData: data,
      validDataLength: data?.length || 0,
    };
  }

  let validDataLength = 0;

  const validData = data.map((each) => {
    const eachUserId =
      typeof each?.userId === 'string' ? each.userId : each.userId?.userId;
    const createdBy =
      typeof each?.createdBy === 'string'
        ? each.createdBy
        : each.createdBy?.userId;

    const ownerIds = [eachUserId, createdBy];

    const isOwner = ownerIds.includes(userId);

    if (isOwner) {
      validDataLength++;

      return each;
    }

    if (hasStoreRoles) {
      validDataLength++;

      return each;
    }

    return null;
  });

  return {
    validData,
    validDataLength,
  };
};
*/
