export const formatError = (error) => {
  const exception = error.extensions.exception;
  const code = exception.code || 500;
  let message = error.message;

  if (exception.validationErrors) {
    message = exception.validationErrors
      .map((error) => Object.values(error.constraints)[0])
      .join(", ");
  }

  if (message.includes("Validation error")) {
    message = exception?.original?.message;
  }

  return {
    code,
    message
  };
};
