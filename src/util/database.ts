import { DatabaseManager } from 'database-manager-lib';

const databaseConfigurations = {
    client: 'postgres',
    database: process.env.DB_NAME || '',
    host: 'localhost',
    password: process.env.DB_PASSWORD || '',
    port: 5432,
    user: process.env.DB_USER || '',
};

const database: DatabaseManager = new DatabaseManager(databaseConfigurations);
const databaseClient = database.setKeyTables([{
    primaryKey: 'id',
    table: 'Player',
}]);

export default databaseClient;