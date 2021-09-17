import { hash,compare } from 'bcrypt';

export const encode = async (pass:string):Promise<string> => {
    return await hash(pass,parseInt(process.env.SALTS as string));
}

export const decode = async (pass:string,hashPass:string):Promise<boolean> => {
    return await compare(pass,hashPass);
}