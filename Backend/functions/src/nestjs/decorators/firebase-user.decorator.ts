import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { extractUserRecordFromBearer } from "src/modules/users/helpers/firebase-user.helper";

export const FirebaseUser = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return extractUserRecordFromBearer(request);
  },
);
