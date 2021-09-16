import { Response } from 'express';
import { PlayerEntity } from '../entity/player';

export const playerEntityMiddleware = (request:any,response:Response,next:any) => {
    let playerData:PlayerEntity = new PlayerEntity({id_user:`player_${Date.now()}`,...request.body});
    request.playerData = playerData;
    next();
}