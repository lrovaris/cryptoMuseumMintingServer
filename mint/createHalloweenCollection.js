const db = require('./db.js');

let halloweenQuantityArray = [
    5,
    5,
    5,
    5,
    5,
    5,
    3,
    3,
    3,
    1
]

let halloweenCollectionObject = {
    name: "Halloween 2021",
    quantity: halloweenQuantityArray
}

async function teste() {
  await db.update_collection('617972583e99e3f0656c6455', 1)
}

teste();