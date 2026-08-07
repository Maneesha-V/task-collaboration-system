import { Request, Response, NextFunction } from "express";
import { log } from "winston";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);

    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    console.log("Validation result:", result);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message,
        errors: result.error.issues,
      });    
    }

    req.body = (result.data as { body: Request["body"] }).body;

    next();
  };
