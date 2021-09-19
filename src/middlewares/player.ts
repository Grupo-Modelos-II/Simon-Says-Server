import { Response, Request } from 'express';
import { PlayerEntity } from '../entity/player';
import { decodePayload, encodePass } from '../util/securityParser';

import { APIResponse } from '../dto/APIResponsedto';

export const playerCreationMiddleware = async (request:Request, response:Response,next:any):Promise<void> => {
    let playerData:PlayerEntity = new PlayerEntity({id_user:`player_${Date.now()}`,...request.body});
    playerData.setPass(await encodePass(playerData.getPass()));
    request.body.playerData = playerData;
    next();
}

export const playerAuthenticationMiddleware = async (request:Request,response:Response,next:any):Promise<void> => {
    const apiResponse: APIResponse = new APIResponse();
    const token = request.headers.authorization || '';
    try {
        const {id_user, exp} = await decodePayload(token.split(' ')[1]);
        if(Date.now() > exp*1000){
            response.status(401).json({
                message: 'Token expired'
            });
        } else {
            request.body.id_user = id_user;
            next();
        }
    } catch (error) {
        apiResponse.setFailQuery({message:'Invalid token', isAuthorized: false});
        response.status(401).json(apiResponse);
    }
}

export const playerVerificationMiddleware = async (request:Request,response:Response,next:any):Promise<void> => {
    const { pass } = request.body;
    if(typeof pass === 'string') {
        request.body.pass = await encodePass(pass);
    } else {
        delete request.body.pass;
    }
    next();
}