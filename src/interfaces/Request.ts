import { CookieSettings } from "@nestjsplus/cookies";
import { Request as ExpressRequest } from "express";
import { User } from "../user/user.entity";

export interface Request extends ExpressRequest {
  _cookies: CookieSettings[],
  user: User,
}
