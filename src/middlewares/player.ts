import { Response } from 'express';
import { PlayerEntity } from '../entity/player';
import { encode } from '../util/hashParser';
import { decodePayload } from '../util/securityParser';

export const playerCreationMiddleware = async (request:any,response:Response,next:any):Promise<void> => {
    let playerData:PlayerEntity = new PlayerEntity({id_user:`player_${Date.now()}`,...request.body});
    playerData.setPass(await encode(playerData.getPass()));
    request.playerData = playerData;
    next();
}

export const playerAuthenticationMiddleware = async (request:any,response:Response,next:any):Promise<void> => {
    const { user_token } = request.body;
    let payloadToken:any = await decodePayload(user_token);
    console.log(payloadToken);
    next();
}