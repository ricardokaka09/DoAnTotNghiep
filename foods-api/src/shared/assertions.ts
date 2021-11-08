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
}

export const NotFound = new Assertions({}, 400);
