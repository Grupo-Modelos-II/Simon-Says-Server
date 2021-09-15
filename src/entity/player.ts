import databaseClient from '../util/database';

export class Player {
    name: string | undefined;
    password: string | undefined;
    max_score: number | undefined;

};

const table: string = 'Player';

export const getPlayer = async (id: number): Promise<Player> => {
    return (await databaseClient.get(table, id)) as Player;
};

export const getPlayers = async (): Promise<Player[]> => {
    return (await databaseClient.getAll(table)) as Player[];
};

export const createPlayer = async (player: Player): Promise<Player> => {
    return (await databaseClient.create(table, player)) as Player;
};

export const updatePlayer = async (player: Player): Promise<Player> => {
    return (await databaseClient.update(table, player)) as Player;
};

export const deletePlayer = async (id: number): Promise<Player> => {
    return (await databaseClient.delete(table, id)) as Player;
};