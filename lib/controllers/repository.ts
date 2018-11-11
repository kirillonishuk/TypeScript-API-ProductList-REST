import {
    DB,
    ObjectId
} from './dbConnection';

export const getCollection = async (collectionName: string) => {
    let db, collection;
    const mongoDB = await new DB(collectionName);
    try {
        db = await mongoDB.getConnection();
        collection = await db.collection(collectionName)
            .find({})
            .toArray();
    }
    catch (error) {
        throw error;
    }
    finally {
        mongoDB.closeConnection();
    }
    return collection;
}

export const addToCollection = async (collectionName: string, insertData: {
    name: string,
    color: string | null,
    cost: string | number,
    image: string | null,
    description: string | null
}) => {
    let db, collection;
    const mongoDB = await new DB(collectionName);
    try {
        db = await mongoDB.getConnection();
        collection = await db.collection(collectionName)
            .insert(insertData);
    }
    catch (error) {
        throw error;
    }
    finally {
        mongoDB.closeConnection();
    }
    return collection;
}

export const deleteFromCollection = async (collectionName: string, _id: string) => {
    if (_id.length === 24) _id = new ObjectId(_id);
    let db, collection;
    const mongoDB = await new DB(collectionName);
    try {
        db = await mongoDB.getConnection();
        collection = await db.collection(collectionName)
            .findOneAndDelete({ _id });
    }
    catch (error) {
        throw error;
    }
    finally {
        mongoDB.closeConnection();
    }
    return collection;
}

export const getOneDocumentFromCollection = async (collectionName: string, _id: string) => {
    if (_id.length === 24) _id = new ObjectId(_id);
    let db, collection;
    const mongoDB = await new DB(collectionName);
    try {
        db = await mongoDB.getConnection();
        collection = await db.collection(collectionName)
            .findOne({ _id });
    }
    catch (error) {
        throw error;
    }
    finally {
        mongoDB.closeConnection();
    }
    return collection;
}

export const updateDocumentInCollection = async (collectionName: string, _id: string, updatedData: {
    name?: string,
    color?: string,
    cost?: number,
    image?: string,
    description?: string
}) => {
    if (_id.length === 24) _id = new ObjectId(_id);
    let db, collection;
    const mongoDB = await new DB(collectionName);
    try {
        db = await mongoDB.getConnection();
        collection = await db.collection(collectionName)
            .findOneAndUpdate({ _id },
                { $set: updatedData },
                { new: true });
    }
    catch (error) {
        throw error;
    }
    finally {
        mongoDB.closeConnection();
    }
    return collection;
}