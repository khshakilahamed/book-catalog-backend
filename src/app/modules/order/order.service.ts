/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, UserRole } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (data: any): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });

  return result;
};

const getAllFromDB = async (verifiedUser: JwtPayload): Promise<Order[]> => {
  if (verifiedUser.role === UserRole.admin) {
    const result = await prisma.order.findMany();
    return result;
  }

  const result = await prisma.order.findMany({
    where: {
      userId: verifiedUser.userId,
    },
  });

  return result;
};

const getByIdFromDB = async (
  orderId: string,
  verifiedUser: JwtPayload,
): Promise<Order | null> => {
  if (verifiedUser.role === UserRole.admin) {
    const result = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    return result;
  }

  const isUserExist = await prisma.user.findUnique({
    where: { id: verifiedUser.userId },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'you are unauthorized');
  }

  const result = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: isUserExist?.id,
    },
  });

  return result;
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
