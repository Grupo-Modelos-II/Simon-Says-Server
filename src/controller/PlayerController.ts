import { Router,Response,Request } from 'express';
import { PlayerRepository } from '../repository/PlayerRepository';
import { PlayerEntity } from '../entity/player';
import { playerEntityMiddleware } from '../middlewares/player';

const playerRepository:PlayerRepository = new PlayerRepository();
const playerController: Router = Router();

playerController.get('/', (request: Request, response:Response) => {
    playerRepository.getPlayer(request.query.id_user as string).then((res:PlayerEntity) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        response.status(400).json(error);
    });
});

playerController.post('/create',playerEntityMiddleware,(request:any,response:Response) => {
    playerRepository.createPlayer(request.playerData).then((res:PlayerEntity) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        response.status(400).json(error);
    });
});

export default playerController;