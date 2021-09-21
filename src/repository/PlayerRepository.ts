import databaseClient from '../util/database';
import { PlayerEntity } from '../entity/player';
export class PlayerRepository{

    private constructor() {}

    private table: string = 'Player';

    private static _playerRepository = new PlayerRepository();

    public static get playerRepository() {return PlayerRepository._playerRepository;}

    public async getPlayerByUserName(username:string):Promise<PlayerEntity>{
        let data:any = await (await databaseClient.customQuery('Player')).findOne({name: username});
        return new PlayerEntity({...data});
    }

    public async getPlayer(id: string): Promise<PlayerEntity>{
        return new PlayerEntity({...(await databaseClient.get(this.table, id))});
    };
    
   public async createPlayer(player: PlayerEntity): Promise<PlayerEntity>  {
       return new PlayerEntity({...(await databaseClient.create(this.table, player))});
    };
    
   public async updatePlayer(player: PlayerEntity): Promise<PlayerEntity>  {
        return new PlayerEntity({...(await databaseClient.update(this.table, player))});
    };
    
   public async deletePlayer  (id: number): Promise<PlayerEntity>  {
        return new PlayerEntity({...(await databaseClient.delete(this.table, id))});
    };

    public async getRank(): Promise<PlayerEntity[]> {
        return (await (await databaseClient.customQuery('Player')).find().sort({max_score: -1})).toArray();//.sort({max_score: -1});
    };
}