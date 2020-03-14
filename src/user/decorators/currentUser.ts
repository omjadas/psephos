import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "../../interfaces/Request";

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    return ctx.getArgByIndex(2).req?.user;
  },
);
