import { createCollection, dropDatabase } from './repository';

export const bootStrap = (collectionName: string) => {
    console.log(`Bootstrap started.`);
    createCollection(collectionName, { field: { 'name': 1 }, options: { unique: true } })
        .then(result => {

        }, error => {
            throw error;
        })
};

export const drop = () => {
    console.log(`Drop database.`);
    dropDatabase()
        .then(result => {

        }, error => {
            throw error;
        })
};

export const erase = (collectionName: string) => {
    console.log(`Erase database.`);
    dropDatabase()
        .then(result => {
            return Promise.resolve(createCollection(collectionName, { field: { 'name': 1 }, options: { unique: true } }))
        }, error => {
            throw error;
        })
};