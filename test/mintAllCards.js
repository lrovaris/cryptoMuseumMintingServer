const { cardanocliJs, getEnv } = require("../cardano");
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const hash = require('object-hash');
const { getFakeWalletById } = require("./test/utils");

let wallet = cardanocliJs.wallet("testNetWallet");



let i = 49
let transaction
let oldQuery = {}
let newQuery = {}

const verifyTransaction = function () {

       oldQuery = newQuery
       newQuery = hash(cardanocliJs.queryUtxo(getFakeWalletById(3).paymentAddr))
       console.log(newQuery)  
       console.log(oldQuery)  

        console.log(i)

        if (newQuery !== oldQuery) {
           console.log("sendou")
           sendFakeAdas(getFakeWalletById(3).paymentAddr, (+5 + +Math.random()))
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
