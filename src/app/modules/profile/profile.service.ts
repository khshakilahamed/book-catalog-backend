import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getProfileFromDB = async (
  verifiedUser: JwtPayload,
): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: verifiedUser.userId,
      role: verifiedUser.role,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found');
  }

  return result;
};

export const ProfileService = {
  getProfileFromDB,
};
