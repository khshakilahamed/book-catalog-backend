import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { ProfileService } from './profile.service';
import { JwtPayload } from 'jsonwebtoken';

const getProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getProfileFromDB(req.user as JwtPayload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileFromDB,
};
