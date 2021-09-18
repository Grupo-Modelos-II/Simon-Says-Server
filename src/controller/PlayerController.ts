import { Router,Response,Request } from 'express';
import { PlayerRepository } from '../repository/PlayerRepository';
import { APIResponse } from '../dto/APIResponsedto';
import { PlayerEntity } from '../entity/player';
import { playerCreationMiddleware,playerAuthenticationMiddleware } from '../middlewares/player';

const playerRepository:PlayerRepository = new PlayerRepository();
const playerController: Router = Router();

playerController.post('/',playerCreationMiddleware,(request:any,response:Response) => {
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

playerController.put('/',playerAuthenticationMiddleware,({body}:{body:PlayerEntity},response:Response) => {
    let responseData:APIResponse = new APIResponse();
    response.send('Holas');
    //playerRepository.updatePlayer();
});

export default playerController;