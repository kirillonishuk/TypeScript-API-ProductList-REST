import * as MongoDB from 'mongodb';

// import * as config from '../config/config.json';

export const ObjectId = MongoDB.ObjectId;

export class DB {
    private MongoClient = MongoDB.MongoClient;
    private connection;
    private database;
    private connectUrl: string = process.env['MONGODB_URI']/* || 
    `mongodb://${config.mongodb.login}:${config.mongodb.password}@${config.mongodb.adress}:${config.mongodb.db}`*/;

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
            console.log(error);
        };
        this.database = this.connection.db(process.env['MONGODB_DBNAME']/* || config.mongodb.name*/);
        return this.database;
    };

    public getConnection = () => {
        return this.setConnection();
    }

    public closeConnection = () => {
        try {
            this.connection.close();
        } catch (error) {
            console.log(error);
        }
    }

    // public createCollection = async (index: boolean[] = null) => {

    // }
};
