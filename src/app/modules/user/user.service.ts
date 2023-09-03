import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { selectUserResponseFields } from '../../../constants/user';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getAllFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: { ...selectUserResponseFields },
  });

  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<User> | null> => {
  const isUserExist = await prisma.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: { ...selectUserResponseFields },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<User>,
): Promise<Partial<User>> => {
  const isUserExist = await prisma.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
    select: { ...selectUserResponseFields },
  });

  return result;
};

const deleteByIdFromDB = async (id: string): Promise<User> => {
  const isUserExist = await prisma.user.findUnique({ where: { id } });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  const result = await prisma.user.delete({ where: { id } });

  return result;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
