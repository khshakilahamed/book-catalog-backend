import { PrismaClient, User } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const prisma = new PrismaClient();

const insertIntoDB = async (data: User): Promise<Partial<User>> => {
  const isAlreadyExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exist');
  }

  const result = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updateAt: true,
    },
  });

  return result;
};

export const AuthService = {
  insertIntoDB,
};
