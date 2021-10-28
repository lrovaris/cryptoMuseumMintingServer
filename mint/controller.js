const db = require('./db');
const cache = require('../memoryCache');

async function get_collections() {
    return cache.get('collections') || await db.get_collection();
}

async function get_halloweenQuantitys() {
    return cache.get('halloweenArray') || await db.get_halloweenQuantityArray();
}

async  function updateHalloweeenQuantity(cardNumber) {
    return await db.update_collection('617972583e99e3f0656c6455', cardNumber)
}

module.exports = {  get_collections, get_halloweenQuantitys, updateHalloweeenQuantity };