import { Router,Request,Response } from 'express';
import { APIResponse } from '../dto/APIResponsedto';
import { PlayerRepository } from '../repository/PlayerRepository';
import { PlayerEntity } from '../entity/player';
import { verifyPassword,authorizedUserProfile } from '../util/securityParser';
import { playerAuthenticationMiddleware } from '../middlewares/player';

let authController:Router = Router();
let playerRepository:PlayerRepository = PlayerRepository.playerRepository;

authController.post('/', async (request: Request, response:Response) => {
    let responseData:APIResponse = new APIResponse();
    const { username,password } = request.body;

    let userData:PlayerEntity = await playerRepository.getPlayerByUserName(username);
    
    let verifiedPassword:boolean = (!userData.getIdUser())? false : await verifyPassword(password,userData.getPass());

    if(verifiedPassword){
        const token:string = await authorizedUserProfile({id_user:userData.getIdUser()});
        userData.setTokenSession(token);
        await playerRepository.updatePlayer(userData);
        responseData.setSuccesQuery({
            token
        });
        response.status(200).json(responseData);
    }else{
        responseData.setFailQuery({
            message:'Nombre de usuario y/o contraseña incorrectos'
        });
        response.status(401).json(responseData);
    }
});

authController.get('/',playerAuthenticationMiddleware,(_,response:Response) => {
    let responseData:APIResponse = new APIResponse();
    responseData.setSuccesQuery({
        isAuthorized:true
    });
    response.status(200).json(responseData);
});



export default authController;