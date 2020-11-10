import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class CSRFMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: () => any): void {
    res.cookie("CSRF-TOKEN", req.csrfToken());
    next();
  }
}
