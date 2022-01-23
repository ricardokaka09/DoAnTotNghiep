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
interface ValidateFirstGroup<T> {
  data: T;
  firstGroupIDs: string[];
  hasFirstGroupScopes: boolean;
}
interface ValidateSecondGroup<T> {
  data: T;
  secondGroupIDs: string[];
  hasSecondGroupScopes: boolean;
}
interface ValidateThirdGroup<T> {
  data: T;
  thirdGroupIDs: string[];
  hasThirdGroupScopes: boolean;
}
interface ValidateFourthGroup<T> {
  data: T;
  fourthGroupIDs: string[];
  hasFourthGroupScopes: boolean;
}
interface ValidatePersonal<T> {
  data: T;
  userID: string | undefined;
  hasPersonalScopes: boolean;
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
    secondGroupKey?: string[],
    thirdGroupKey?: string[],
    fourthGroupKey?: string[],
    firstGroupKeyNameForIDs?: string,
    secondGroupKeyNameForIDs?: string,
    thirdGroupKeyNameForIDs?: string,
    fourthGroupKeyNameForIDs?: string,
    firstGroupKeyNameForScopes?: string,
    secondGroupKeyNameForScopes?: string,
    thirdGroupKeyNameForScopes?: string,
    fourthGroupKeyNameForScopes?: string,
  ) {
    this.personalKey = personalKey;
    this.firstGroupKey = firstGroupKey;
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
      (personalIDsFormat === null || personalIDsFormat === void 0
        ? void 0
        : personalIDsFormat.includes(userID)) &&
      hasPersonalScopes;
    return isOwned;
  };
  validateFirstGroup = ({ data, firstGroupIDs, hasFirstGroupScopes }) => {
    const firstGroupIDsFromData = this.getFirstGroupIDs(data);
    const isInFirstGroup =
      (firstGroupIDsFromData === null || firstGroupIDsFromData === void 0
        ? void 0
        : firstGroupIDsFromData.some((eachID) =>
            firstGroupIDs === null || firstGroupIDs === void 0
              ? void 0
              : firstGroupIDs.includes(eachID),
          )) && hasFirstGroupScopes;
    return isInFirstGroup;
  };
  validateSecondGroup = ({ data, secondGroupIDs, hasSecondGroupScopes }) => {
    const secondGroupIDsFromData = this.getSecondGroupIDs(data);
    const isInSecondGroup =
      (secondGroupIDsFromData === null || secondGroupIDsFromData === void 0
        ? void 0
        : secondGroupIDsFromData.some((eachID) =>
            secondGroupIDs === null || secondGroupIDs === void 0
              ? void 0
              : secondGroupIDs.includes(eachID),
          )) && hasSecondGroupScopes;
    return isInSecondGroup;
  };
  validateThirdGroup = ({ data, thirdGroupIDs, hasThirdGroupScopes }) => {
    const thirdGroupIDsFromData = this.getThirdGroupIDs(data);
    const isInThirdGroup =
      (thirdGroupIDsFromData === null || thirdGroupIDsFromData === void 0
        ? void 0
        : thirdGroupIDsFromData.some((eachID) =>
            thirdGroupIDs === null || thirdGroupIDs === void 0
              ? void 0
              : thirdGroupIDs.includes(eachID),
          )) && hasThirdGroupScopes;
    return isInThirdGroup;
  };
  validateFourthGroup = ({ data, fourthGroupIDs, hasFourthGroupScopes }) => {
    const fourthGroupIDsFromData = this.getFourthGroupIDs(data);
    const isInFourthGroup =
      (fourthGroupIDsFromData === null || fourthGroupIDsFromData === void 0
        ? void 0
        : fourthGroupIDsFromData.some((eachID) =>
            fourthGroupIDs === null || fourthGroupIDs === void 0
              ? void 0
              : fourthGroupIDs.includes(eachID),
          )) && hasFourthGroupScopes;
    return isInFourthGroup;
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
