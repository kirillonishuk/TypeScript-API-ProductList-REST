import * as MongoDB from 'mongodb';
import * as config from '../config/config.json';

export const ObjectId = MongoDB.ObjectId;

export class DB {
    private MongoClient = MongoDB.MongoClient;
    private connection;
    private database;
    private connectUrl: string = `mongodb://${config.mongodb.login}:${config.mongodb.password}@${config.mongodb.adress}:${config.mongodb.db}`;

    public collectionName: string;

    constructor(collectionName: string = 'products') {
        this.collectionName = collectionName;
    };

    private setConnection = async () => {
        try {
            this.connection = await this.MongoClient.connect(this.connectUrl, {
                useNewUrlParser: true
            })
        }
        catch (error) {
            throw error;
        };
        this.database = this.connection.db(config.mongodb.name);
        return this.database;
    };

    public getConnection = () => {
        return this.setConnection();
    }

    public closeConnection = () => {
        this.connection.close();
    }

    // public createCollection = async (index: boolean[] = null) => {
        
    // }
};
