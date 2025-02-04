// Import necessary modules and types from external files
// import { NextFunction, Request, Response } from 'express'
import { Context, Env, Next } from "hono";
import { AnyZodObject } from "zod";

// Define a middleware function to validate incoming requests against a Zod schema
const validateRequest = (schema: AnyZodObject) => {
  return async (c: Context<Env, any, {}>, next: Next) => {
    await schema.parseAsync({
      body: await c.req.json(),
    });

    await next();
  };
};
// const validateRequest = (schema: AnyZodObject) => {
//   // Use the catchAsync utility to handle asynchronous operations and errors
//   return async (c: Context<Env, any, {}>, next: Next) => {
//     console.log(await c.req.json());
//     // console.log(getCookie(c));
//     // Parse and validate the request data against the provided schema
//     await schema.parseAsync({
//       body: await c.req.json(), // Validate request body
//       //   cookies: getCookie(c), // Validate request cookies
//     });

//     // Move to the next middleware or route handler if validation succeeds
//     await next();
//   };
// };

// Export the middleware for use in other modules
export default validateRequest;
