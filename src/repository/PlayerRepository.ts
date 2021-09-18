import databaseClient from '../util/database';
import { PlayerEntity } from '../entity/player';
export class PlayerRepository{

    private table: string = 'Player';

    public async getPlayerByUserName(username:string):Promise<PlayerEntity>{
        let data:any = await databaseClient.customQuery('SELECT * FROM player where name=$1',[username]);
        return new PlayerEntity({...data[0]});
    }

    public async getPlayer(id: string): Promise<PlayerEntity>{
        return (await databaseClient.get(this.table, id)) as PlayerEntity;
    };
    
    public async getPlayers():Promise<PlayerEntity[]> {
        return (await databaseClient.getAll(this.table)) as PlayerEntity[];
    };
    
   public async createPlayer (player: PlayerEntity): Promise<PlayerEntity>  {
       return (await databaseClient.create(this.table, player)) as PlayerEntity;
    };
    
   public async updatePlayer  (player: PlayerEntity): Promise<PlayerEntity>  {
        return (await databaseClient.update(this.table, player)) as PlayerEntity;
    };
    
   public async deletePlayer  (id: number): Promise<PlayerEntity>  {
        return (await databaseClient.delete(this.table, id)) as PlayerEntity;
    };
}