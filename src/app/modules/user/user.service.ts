import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { selectUserResponseFields } from '../../../constants/user';

const getAllFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: { ...selectUserResponseFields },
  });

  return result;
};

export const UserService = {
  getAllFromDB,
};
