// Import necessary modules and types from external files
// import { NextFunction, Request, RequestHandler, Response } from "express";

import { Context, Env, Handler, Next } from "hono";

// Define a utility function to catch asynchronous errors in route handlers
const catchAsync = (fn: Handler) => {
  // Return a new function that wraps the original route handler
  return (c: Context<Env, any, {}>, next: Next) => {
    // Resolve the promise returned by the original route handler
    Promise.resolve(fn(c, next)).catch(async (err: any) => {
      console.error(err);
      await next();
    });
  };
};

// Export the catchAsync utility function for use in other modules
export default catchAsync;
