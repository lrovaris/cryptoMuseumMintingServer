const { cardanocliJs, getEnv } = require("../cardano");
const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");
const hash = require('object-hash');
const { getFakeWalletById } = require("./utils");

let wallet = cardanocliJs.wallet("testNetWallet");



let i = 1
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
           sendFakeAdas(getFakeWalletById(3), (5))
           console.log("txhash: "+transaction)
        }


        isTransactionValid = i >= 120;

        i++
        if (isTransactionValid) {
                return;
        } else {
                setTimeout(verifyTransaction, 10000);

                return;
        }
};


module.exports = verifyTransaction();
