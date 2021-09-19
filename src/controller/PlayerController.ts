import { Router,Response,Request } from 'express';
import { PlayerRepository } from '../repository/PlayerRepository';
import { APIResponse } from '../dto/APIResponsedto';
import { PlayerEntity } from '../entity/player';
import { playerCreationMiddleware,playerAuthenticationMiddleware, playerVerificationMiddleware } from '../middlewares/player';

const playerRepository:PlayerRepository = PlayerRepository.playerRepository;
const playerController: Router = Router();

playerController.post('/',playerCreationMiddleware,(request:Request,response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.createPlayer(request.body.playerData).then((res:PlayerEntity) => {
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

playerController.put('/',playerAuthenticationMiddleware, playerVerificationMiddleware,({body}:{body:PlayerEntity},response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.updatePlayer(body).then((res:PlayerEntity) => {
        responseData.setSuccesQuery({
            userData:res,
            message:'Usuario actualizado de exitosamente'
            });
        response.status(200).json(responseData);
    }).catch((error:any) => {
        responseData.setFailQuery({
            err:error,
            message:'Error al actualizar usuario'
        });
        response.status(400).json(responseData);
    });
});

export default playerController;