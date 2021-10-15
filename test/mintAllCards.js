const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {

        sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)



        setTimeout( () => {
                mintAsset(metadataArray[0], 10, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
                sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)
        }, 60000)






}

module.exports = mintAllCards();