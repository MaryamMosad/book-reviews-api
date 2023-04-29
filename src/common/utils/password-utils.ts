import * as bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

const validatePassword = async (
  inputPassword,
  hashedPassword
): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

export { hashPassword, validatePassword };
