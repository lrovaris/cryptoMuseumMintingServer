const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");
const hash = require('object-hash');

let wallet = cardanocliJs.wallet("testNetWallet");

function mintAllCards() {

   



        setTimeout( () => {
                mintAsset(metadataArray[0], 10, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
           
        }, 60000)






}

let i = 0
let oldQuery = {}
let newQuery = {}

const verifyTransaction = function () {

        oldQuery = newQuery
        console.log("oldQuery")
        console.log(oldQuery)
        newQuery = hash(cardanocliJs.queryUtxo(wallet.paymentAddr))
        console.log("newQuery")
        console.log(newQuery)

        if (newQuery !== oldQuery) {
                console.log("a")
                mintAsset(metadataArray[i], 10000000, cardanocliJs.wallet("fake-wallet-3").paymentAddr)
        }


        isTransactionValid = i >= 50;

        i++
        if (isTransactionValid) {
                return;
        } else {
                setTimeout(verifyTransaction, 10000);

                return;
        }
};


module.exports = verifyTransaction();
