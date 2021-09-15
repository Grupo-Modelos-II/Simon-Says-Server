import { Router,Response,Request } from 'express';
import { PlayerRequestDto } from '../dto/PlayerRequestDto';
import { PlayerRepository } from '../repository/PlayerRepository';
import { PlayerEntity } from '../entity/player';

const playerRepository:PlayerRepository = new PlayerRepository();
const playerController: Router = Router();

playerController.get('/', (_: Request, response:Response) => {
    playerRepository.getPlayers().then((res:PlayerEntity[]) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        response.status(400).json(error);
    });
});

playerController.post('/create',({body}: {body: PlayerRequestDto},response:Response) => {
    playerRepository.createPlayer(body).then((res:PlayerEntity) => {
        response.status(200).json(res);
    }).catch((error:any) => {
        console.log(error);
        response.status(400).json(error);
    });
});

export default playerController;