import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data?: T | null;
  token?: string | null;
};

const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    meta: data.meta || null || undefined,
    data: data.data,
    token: data.token,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
