const { cardanocliJs, getEnv } = require("../cardano");
const { mintAsset } = require ("../mintAsset")
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const  metadataArray  = require("../metadatas");
const hash = require('object-hash');

let wallet = cardanocliJs.wallet("testNetWallet");



let i = 0


const verifyTransaction = function () {

 


         let transaction =   cardanocliJs.transactionSubmit(mintAsset(metadataArray[i], 10000000, cardanocliJs.wallet("fake-wallet-5").paymentAddr))
         
   
        isTransactionValid = i >= 50;

        i++
        if (isTransactionValid) {
                return;
        } else {
                setTimeout(verifyTransaction, 100);

                return;
        }
};


module.exports = verifyTransaction();
