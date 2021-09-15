import { Router } from 'express';

import { PlayerRequest } from '../dto/player';

const playerController: Router = Router();

playerController.get('/', ({body}: {body: PlayerRequest}, res) => {
    return res.send(body);
});

export default playerController;