class ApiError extends Error {
  constructor(
    statusCode,
    message = "Somthing went wrong",
    data = [],
    error = true,
    success = false,
    stack = "",
  ) {
    super(message);
    statusCode = this.statusCode;
    message = this.message;
    data = this.data;
    error = this.error;
    success = this.success;

    if (stack) {
      stack = this.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
