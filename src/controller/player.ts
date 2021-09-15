import { Router,Response,Request } from 'express';
import { PlayerRequest } from '../dto/player';
import { Player,createPlayer,getPlayers } from '../entity/player';

const playerController: Router = Router();

playerController.get('/', (_: Request, response:Response) => {
    getPlayers().then((res:Player[]) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        response.status(400).json(error);
    });
});

playerController.post('/create',({body}: {body: PlayerRequest},response:Response) => {
    let dataBody:any = {'id_user':Date.now(),...body}
    createPlayer(dataBody).then((res:Player) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        console.log(error);
        response.status(400).json(error);
    });
});

export default playerController;