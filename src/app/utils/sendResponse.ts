// Import necessary modules and types from external files
// import { Response } from 'express'

import { Context, Env } from "hono";
import { BlankInput } from "hono/types";
import { StatusCode } from "hono/utils/http-status";

// Define a type for metadata information in the response
type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

// Define a generic type for the standardized response format
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: TMeta;
  data: T;
};

// Define a utility function to send a standardized response
const sendResponse = <T>(
  c: Context<Env, any, BlankInput>,
  data: TResponse<T>
) => {
  // Send the response with the standardized format
  return c.json(
    {
      success: data.success,
      message: data.message,
      meta: data.meta,
      data: data.data,
    },
    data?.statusCode as StatusCode | undefined
  );
};

// Export the sendResponse utility function for use in other modules
export default sendResponse;
