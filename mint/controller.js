const db = require('./db');
const cache = require('../memoryCache');

async function get_collections() {
    return cache.get('collections') || await db.get_collection();
}

module.exports = {  get_collections };