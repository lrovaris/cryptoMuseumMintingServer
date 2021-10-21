const { getEnv } = require("../getEnv");
const { cardanocliJs } = require("../cardano");
const metadataArray = require("../metadatas");
const { mintAsset } = require("../mintAsset");

let wallet;

if (getEnv() === "testnet") {
    wallet = cardanocliJs.wallet("testNetWallet");
} else {
    wallet = cardanocliJs.wallet("cryptoMuseumFORREAL");
}


console.log(cardanocliJs.wallet('ADAPI').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal2').balance())
console.log(cardanocliJs.wallet('cryptoMuseum').balance())
console.log(cardanocliJs.wallet('cryptoMuseumTest').balance())
console.log("aaa")

/*
let transaction = cardanocliJs.transactionSubmit(
    mintAsset(
        metadataArray['marylns'],
        'valorNaCarteira',
        'addr1qxqktk26vlern6ma3vpadvnxruu0ynfcug0x9k9jx8hh4sulur0lw3c226z0rrzvkkd0katsh2vhr6gzuuhfm9m9dp8qf96ajq'
    )
);
*/