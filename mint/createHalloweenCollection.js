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
  await db.register_collection(halloweenCollectionObject)
}

teste();