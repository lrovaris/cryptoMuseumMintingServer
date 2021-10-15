const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");
const hash = require('object-hash');

let wallet = cardanocliJs.wallet("testNetWallet");



let i = 49
let transaction
let oldQuery = {}
let newQuery = {}

const verifyTransaction = function () {

       oldQuery = newQuery
       newQuery = hash(cardanocliJs.queryUtxo(wallet.paymentAddr))
       console.log(newQuery)  
       console.log(oldQuery)  

        console.log(i)

        if (newQuery !== oldQuery) {
           console.log("mintou")
           transaction = cardanocliJs.transactionSubmit(mintAsset(metadataArray[i], 10000000, cardanocliJs.wallet("fake-wallet-5").paymentAddr))
           console.log("txhash: "+transaction)
        }


        isTransactionValid = i >= 50;

        i++
        if (isTransactionValid) {
                return;
        } else {
                setTimeout(verifyTransaction, 60000);

                return;
        }
};


module.exports = verifyTransaction();
