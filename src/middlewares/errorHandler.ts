import { Request, Response } from "express";
import AppError from "../errors/appError";

export default function errorHandler(error: Error, req: Request, res: Response) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message
    })
  }

  return res.status(500).json({ message: `lascou: ${error.message}` })
}