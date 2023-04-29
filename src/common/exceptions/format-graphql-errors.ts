export const formatError = (error) => {
  return {
    message: error.message,
    validationErrors: error.extensions.exception.validationErrors?.map(
      (error) => error.constraints
    ),
  };
};
