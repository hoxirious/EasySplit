import * as functions from "firebase-functions";
export declare const firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
};
export declare const createNestServer: (expressInstance: any) => Promise<import("@nestjs/common").INestApplication>;
export declare const users: functions.HttpsFunction;
