import { hash,compare } from 'bcrypt';
import { sign,verify } from 'jsonwebtoken';

export const encodePass = async (pass:string):Promise<string> => {
    return await hash(pass,parseInt(process.env.SALTS as string));
}

export const verifyPassword = async (pass:string,hashPass:string):Promise<boolean> => {
    return await compare(pass,hashPass);
}

export const authorizedUserProfile = async(dataToken:any):Promise<string> => {
    return await sign(dataToken,process.env.TOKEN_SECRET as string, {
        expiresIn: String(process.env.EXPIRATION_TIME)
    });
}

export const decodePayload = async (token:string):Promise<any> => {
    return await verify(token,process.env.TOKEN_SECRET as string);
}