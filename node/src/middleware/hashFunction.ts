import * as bcrypt from "bcrypt";

const hashFunction = async (password: string): Promise<string> => {
  const saltRounds = 12;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: any) {
    throw new Error(`Error hashing password: ${(error as Error).message}`);
  }
};

export default hashFunction;
