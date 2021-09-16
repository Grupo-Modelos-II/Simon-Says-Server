import { Router,Response,Request } from 'express';
import { PlayerRepository } from '../repository/PlayerRepository';
import { APIResponse } from '../dto/APIResponsedto';
import { PlayerEntity } from '../entity/player';
import { playerEntityMiddleware } from '../middlewares/player';

const playerRepository:PlayerRepository = new PlayerRepository();
const playerController: Router = Router();

playerController.get('/', (request: Request, response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.getPlayer(request.query.id_user as string).then((res:PlayerEntity) => {
        responseData.setSuccesQuery({
            userData:res,
            message:'Usuario creado de exitosamente'
        });
        response.status(200).json(responseData);
    }).catch((error:any) => {
        responseData.setFailQuery({
            error:error,
            message:'Usuario obtenido exitosamente'
        });
        response.status(400).json(error);
    });
});

playerController.post('/create',playerEntityMiddleware,(request:any,response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.createPlayer(request.playerData).then((res:PlayerEntity) => {
        responseData.setSuccesQuery({
            userData:res,
            message:'Usuario creado de exitosamente'
        });
        response.status(200).json(responseData);
    }).catch((error:any) => {
        responseData.setFailQuery({
            err:error,
            message:'Error al crear usuario'
        });
        response.status(400).json(responseData);
    });
});

export default playerController;