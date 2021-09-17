import { Response } from 'express';
import { PlayerEntity } from '../entity/player';
import { encode } from '../util/hashParser';

export const playerEntityMiddleware = async (request:any,response:Response,next:any) => {
    let playerData:PlayerEntity = new PlayerEntity({id_user:`player_${Date.now()}`,...request.body});
    playerData.setPass(await encode(playerData.getPass()));
    request.playerData = playerData;
    next();
}