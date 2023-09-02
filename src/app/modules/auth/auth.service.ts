import { User } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import prisma from '../../../shared/prisma';
import { selectUserResponseFields } from '../../../constants/user';
import { ISignInUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const registerUser = async (data: User): Promise<Partial<User>> => {
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
    select: { ...selectUserResponseFields },
  });

  return result;
};

const signIn = async (data: ISignInUser) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (data.password !== isUserExist.password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // const token = jwt.sign(
  // {
  //   role: isUserExist.role,
  //   userId: isUserExist.id,
  // },
  //   config.jwt.secret as Secret,
  //   { expiresIn: config.jwt.expires_in },
  // );
  const token = jwtHelpers.createToken(
    {
      role: isUserExist.role,
      userId: isUserExist.id,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return token;
};

export const AuthService = {
  registerUser,
  signIn,
};
