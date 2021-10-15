const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const { metadataArray } = require("../metadatas");

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {
    for (let i = 0; i < 175; i++){
        sendFakeAdas(0, 5)
    }

    for (let h = 0; h < 50; h++){
        mintAsset(metadataArray[h], 5, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
    }

    for (let i = 0; i < 30; i++){
        sendFakeAdas(2, 5)
    }

}

module.exports = mintAllCards();