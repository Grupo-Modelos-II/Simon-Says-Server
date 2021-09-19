import { Response, Request } from 'express';
import { PlayerEntity } from '../entity/player';
import { PlayerRepository } from '../repository/PlayerRepository';
import { decodePayload, encodePass } from '../util/securityParser';

let playerRepository:PlayerRepository = PlayerRepository.playerRepository;

export const playerCreationMiddleware = async (request:Request, response:Response,next:any):Promise<void> => {
    let playerData:PlayerEntity = new PlayerEntity({id_user:`player_${Date.now()}`,...request.body});
    playerData.setPass(await encodePass(playerData.getPass()));
    request.body.playerData = playerData;
    next();
}

export const playerAuthenticationMiddleware = async (request:Request,response:Response,next:any):Promise<void> => {
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
        response.status(401).json({message:'Invalid token'});
    }
}

export const playerVerificationMiddleware = async (request:Request,response:Response,next:any):Promise<void> => {
    const {id_user, pass} = request.body;
    if(typeof pass === 'string') {
        request.body.pass = await encodePass(pass);
    } else {
        delete request.body.pass;
    }
    next();
}