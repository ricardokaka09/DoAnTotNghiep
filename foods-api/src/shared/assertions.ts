import { not } from 'joi';
import { badRequestErrors, notFoundErrors } from '../constants/errors';

interface IsTruThy {
  and?: any[];
  or?: any[];
  errorName: string;
}
class Assertions {
  errors: any[];
  httpStatusCode: number;
  constructor(errors, httpStatusCode) {
    (this.errors = errors), (this.httpStatusCode = httpStatusCode);
  }
  isTruthy({ and, or, errorName = 'Not_Truthy' }: IsTruThy): boolean {
    const message = this.errors[errorName];
    if (!message) {
      throw new Error('need to update error message into errors parameter');
    }
    if (and && or) {
      throw new Error('need to use either and/or parameter, not both of them');
    }
    const isAnd = and && and.every((each) => !!each);
    if (isAnd) {
      return true;
    }

    const isOr = or && or.every((each) => !!each);
    if (isOr) {
      return true;
    }

    throw {
      code: this.httpStatusCode,
      message,
    };
  }
  isFalsy = ({ and, or, errorName = 'NOT_FALSY' }: IsTruThy) => {
    const message = this.errors[errorName];
    if (!message) {
      throw new Error('need to update error message into errors parameter');
    }
    if (and && or) {
      throw new Error('need to use either and/or parameter, not both of them');
    }
    const isAnd =
      !!(and === null || and === void 0 ? void 0 : and.length) &&
      and.every((each) => !!each);
    if (!isAnd && !or) {
      return true;
    }
    const isOr =
      !!(or === null || or === void 0 ? void 0 : or.length) &&
      or.some((each) => !!each);
    if (!isOr && !and) {
      return true;
    }
    throw {
      code: this.httpStatusCode,
      message,
    };
  };
}

export const NotFound = new Assertions(notFoundErrors, 404);
export const BadRequest = new Assertions(badRequestErrors, 400);
