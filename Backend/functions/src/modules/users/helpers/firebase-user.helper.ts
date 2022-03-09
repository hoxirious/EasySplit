import * as admin from "firebase-admin";
import { Request } from "express";

/**
 *  obtain and pass jwt to extractFirebaseUser to obtain user
 * @param bearer
 * @returns : Promise<admin.auth.UserRecord
 */
export const extractUserRecordFromBearer = async (
  request: Request,
): Promise<admin.auth.UserRecord> => {
  const myJwt = extractJwt(request);
  return await extractFirebaseUser(myJwt);
};

/**
 * obtain user record form google authentication
 * @param jwt
 * @returns : Promise<admin.auth.UserRecord
 */
const extractFirebaseUser = async (
  jwt: string,
): Promise<admin.auth.UserRecord> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(jwt);
    return await admin.auth().getUser(decodedToken.uid);
  } catch (error) {
    throw new Error("user/not-authorized");
  }
};
/**
 *
 * @param bearer
 * @returns
 */
const extractJwt = (request: Request): string => {
  const bearer = request.headers.authorization;
  if (!bearer) {
    throw new Error("user/authorization-token-not-found");
  }

  const myJwt = bearer?.split(" ")[1];
  return myJwt;
};
