import databaseClient from '../util/database';
import { PlayerEntity } from '../entity/player';
import { PlayerRequestDto } from '../dto/PlayerRequestDto';

export class PlayerRepository{

    private table: string = 'Player';

    public async getPlayer(id: number): Promise<PlayerEntity>{
        return (await databaseClient.get(this.table, id)) as PlayerEntity;
    };
    
    public async getPlayers():Promise<PlayerEntity[]> {
        return (await databaseClient.getAll(this.table)) as PlayerEntity[];
    };
    
   public async createPlayer (player: PlayerRequestDto): Promise<PlayerEntity>  {
       let playerData:PlayerEntity = new PlayerEntity({id_user:Date.now(),...player});
       return (await databaseClient.create(this.table, playerData)) as PlayerEntity;
    };
    
   public async updatePlayer  (player: PlayerEntity): Promise<PlayerEntity>  {
        return (await databaseClient.update(this.table, player)) as PlayerEntity;
    };
    
   public async deletePlayer  (id: number): Promise<PlayerEntity>  {
        return (await databaseClient.delete(this.table, id)) as PlayerEntity;
    };
}