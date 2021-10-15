const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const { metadataArray } = require("../metadatas");

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {
    for (let i = 0; i < 175; i++){
        setTimeout( () => {
            sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 5)
        },60000)
    }

    for (let h = 0; h < 50; h++){
        setTimeout( () => {
            mintAsset(metadataArray[h], 5, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
        },60000)

    }

    for (let i = 0; i < 30; i++){
        setTimeout( () => {
            sendFakeAdas(2, 5)
        },60000)

    }

}

module.exports = mintAllCards();