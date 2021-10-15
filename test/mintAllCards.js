const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");
const hash = require('object-hash');

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
let oldQuery = {}
let newQuery = {}

const verifyTransaction = function () {

        oldQuery = hash(newQuery)
        console.log("oldQuery")
        console.log(oldQuery)
        newQuery = hash(cardanocliJs.queryUtxo(wallet.paymentAddr))
        console.log("newQuery")
        console.log(newQuery)

        if (newQuery === oldQuery) {
                setTimeout(verifyTransaction, 10000)
        }

        sendFakeAdas(cardanocliJs.wallet("fake-wallet-0"), 10)

        isTransactionValid = i >= 49;

        i++
        if (isTransactionValid) {
                for(let h = 0 ; 0 < 50; h++) {
                        mintAsset(metadataArray[h], 1000000, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
                }
                return;
        } else {
                setTimeout(verifyTransaction, 10000);

                return;
        }
};


module.exports = verifyTransaction();