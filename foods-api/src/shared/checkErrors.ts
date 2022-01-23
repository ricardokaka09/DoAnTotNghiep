const getErrorsInLocal = (error) => {
  const statusCodes = [error.status, error.code, error.statusCode];
  if (statusCodes.includes(401)) {
    return {
      error: 'Unauthorized',
      code: 401,
    };
  }
  if (statusCodes.includes('ER_DUP_ENTRY')) {
    return {
      message: error.message,
      error: 'BadRequest',
      code: 400,
    };
  }
  if (error.name === 'MongoError' && error.code === 11000) {
    return {
      message: 'Duplicated email, name or phone',
      error: 'Bad Request',
      code: 400,
    };
  }
  if (statusCodes.includes(403)) {
    return {
      message: error.message || error.name,
      code: 403,
      error: 'Forbidden',
    };
  }
  if (statusCodes.includes(404)) {
    return {
      message: error.message || error.name,
      code: 404,
      error: 'Not Found',
    };
  }
  if (statusCodes.includes(400)) {
    return {
      message: error.message || error.name,
      error: 'Bad Request',
      code: 400,
    };
  }
  return {
    message: `${error.message} - ${error.stack}`,
    code: 500,
    error: 'Internal Server Error',
  };
};

export class HttpExceptionFilter {
  getErrors = getErrorsInLocal;
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const nodeEnv = process.env.NODE_ENV || 'local';
    const shouldLogRequestEnvironments = [
      'production',
      'dev',
      'uat',
      'staging',
    ];
    if (shouldLogRequestEnvironments.includes(nodeEnv)) {
      console.log('____REQUEST____', request);
    }
    const exceptionResponse = exception.response || exception.message;
    const errorObject =
      typeof exceptionResponse === 'object' ? exceptionResponse : exception;
    const { code, message, error } = this.getErrors(errorObject);
    if (code === 401) {
      return response.status(code).json({
        error,
        statusCode: code,
      });
    }
    if (!message) {
      return response.status(400).json({
        statusCode: 400,
        message: 'need to update error message into errors parameter',
      });
    }
    return response.status(code).json({
      error,
      statusCode: code,
      message: message || errorObject.message || exception.message,
    });
  }
}
