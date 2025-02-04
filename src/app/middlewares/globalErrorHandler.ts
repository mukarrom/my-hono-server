import { Context, Env, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interfaces/error";

export const onError = (err: any, c: Context<Env, any, {}>) => {
  // console.log(err.statusCode);

  // Setting default values for error response
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  // Check the type of error and handle accordingly
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    // Handle custom AppError
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    // Handle generic Error
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  console.log(`📢 ${err} on line ${err.stack}`);
  return c.json(
    {
      success: false,
      message,
      errorSources,
      data: err,
      stack: config.env === "development" ? err.stack : null,
    },
    statusCode as StatusCode
  );
};

export const globalErrorHandler = async (
  c: Context<Env, "*", {}>,
  next: Next
) => {
  try {
    return await next();
  } catch (err: any) {
    console.error(err);
    return c.text(`Error1: ${err.message}`, 500);
  }
};
