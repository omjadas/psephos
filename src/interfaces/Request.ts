import { CookieSettings } from "@nestjsplus/cookies";
import { Request as ExpressRequest } from "express";

export interface Request extends ExpressRequest {
  _cookies: CookieSettings[],
}
