import { Router,Response,Request } from 'express';
import { PlayerRepository } from '../repository/PlayerRepository';
import { APIResponse } from '../dto/APIResponsedto';
import { PlayerEntity } from '../entity/player';
import { playerCreationMiddleware,playerAuthenticationMiddleware, playerVerificationMiddleware } from '../middlewares/player';

const playerRepository:PlayerRepository = PlayerRepository.playerRepository;
const playerController: Router = Router();

playerController.get('/',playerAuthenticationMiddleware,(request: Request, response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.getPlayer(request.body.id_user).then((res:PlayerEntity) => {
        if(res.getIdUser() !== undefined){
            responseData.setSuccesQuery({
                userData:res,
            });
            response.status(200).json(responseData);
        }else{
            responseData.setFailQuery({
                userData:null,
                message:'No se encontro información del usuario'
            });
            response.status(404).json(responseData);
        }
    }).catch((error:any) => {
        responseData.setFailQuery({
            error:error,
            message:'Ha ocurrido un error al traer la información'
        });
        response.status(500).json(responseData);
    });
});

playerController.post('/',playerCreationMiddleware,(request:Request,response:Response) => {
    let responseData:APIResponse = new APIResponse();
    playerRepository.createPlayer(request.body.playerData).then((res:PlayerEntity) => {
        responseData.setSuccesQuery({
            userData:res,
            message:'Usuario creado exitosamente'
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

playerController.get('/rank', async (request: Request, response:Response) => {
    const apiResponse:APIResponse = new APIResponse();
    const rank: any[] = await playerRepository.getRank();
    let code: number = 0;
    if(rank.length) {
        apiResponse.setSuccesQuery({
            rank:rank,
            message:'Lista de jugadores'
        });
        code = 200;
    } else {
        apiResponse.setFailQuery({
            rank:null,
            message:'No se encontraron jugadores'
        });
        code = 404;
    }
    response.status(code).json(apiResponse);
});

export default playerController;