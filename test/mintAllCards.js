const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {

        sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)



        setTimeout( () => {
                mintAsset(metadataArray[0], 5, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
        }, 60000)



        sendFakeAdas(2, 5)


}

module.exports = mintAllCards();