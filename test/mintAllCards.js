const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {

        for (let i = 0 ;i < 70 ;i ++) {
                sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)
        }



        setTimeout( () => {
                mintAsset(metadataArray[0], 10, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
                sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)
        }, 60000)






}

let i = 0

const verifyTransaction = function () {

        sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)

        isTransactionValid = i >= 49;
        i++
        if (isTransactionValid) {
                return;
        } else {
                setTimeout(verifyTransaction, 65000);
                return;
        }
};


module.exports = verifyTransaction();