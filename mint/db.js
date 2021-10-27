const ObjectId = require('mongodb').ObjectId;
const db_utils = require('../db.js');
const cache = require('../memoryCache');
const controller = require('./controller')

async function get_collection() {
    let db_conn = await db_utils.get_db();

    let db_entries = await db_conn.collection("collections").find({}).toArray();

    cache.set("collections", db_entries);

    return db_entries;
}

async function register_collection(quantityArray) {
    let db_conn = await db_utils.get_db();

    let quantityCard_db = await db_conn.collection("collections").insertOne(quantityArray)

    await get_collection();

    return quantityCard_db.ops[0];
}


async function update_collection(collection_id, cardNumber) {

    let db_conn = await db_utils.get_db();

    let updatedCollection
    let thisCollection

    let allCollections = await db_conn.collection("collections").find({}).toArray();

    setTimeout( async ()=> {
        thisCollection = allCollections.find(_collection_id => collection_id._id == ObjectId(_collection_id))

        console.log(thisCollection)

        console.log(allCollections)

        if (thisCollection) {

            thisCollection.quantity[cardNumber - 1] = -1;

            updatedCollection = await db_conn.collection("collections").replaceOne({_id: new ObjectId(collection_id)}, thisCollection, {
                w: "majority",
                upsert: false
            });
            console.log(`Modificados ${updatedCollection.result.nModified} elementos`);

            await get_collection();

            return updatedCollection.ops[0];

        }
    }, 5000)

}


module.exports = {get_collection, register_collection, update_collection};