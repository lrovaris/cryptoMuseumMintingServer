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

const sender = cardanocliJs.wallet('cryptoMuseumFinal2')


const sendFakeAdas = function () {
    const receiver =
        "addr1qxcd03zuth7gjlxwsgswfzm0tvk2x9z9ghgeljq6xt89hynfxr35pxlj7p3c8kv7w3ue6t52049s0y2gm73ezpsyul8sp3nkkj";

    const txInfo = {
        txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: receiver,
                value: {
                    lovelace: sender.balance().value.lovelace,
                },
            },
        ],
    };

    const raw = cardanocliJs.transactionBuildRaw(txInfo);

    const fee = cardanocliJs.transactionCalculateMinFee({
                                                            ...txInfo,
                                                            txBody: raw,
                                                            witnessCount: 1,
                                                        });

    txInfo.txOut[1].value.lovelace -= fee;

    const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee });

    const txSigned = cardanocliJs.transactionSign({
                                                      txBody: tx,
                                                      signingKeys: [sender.payment.skey],
                                                  });

    const txHash = cardanocliJs.transactionSubmit(txSigned);

    console.log(txHash);
};


sendFakeAdas()


/*
console.log(cardanocliJs.wallet('ADAPI').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal2').balance())
console.log(cardanocliJs.wallet('cryptoMuseum').balance())
console.log(cardanocliJs.wallet('cryptoMuseumTest').balance())
console.log("aaa")


let transaction = cardanocliJs.transactionSubmit(
    mintAsset(
        metadataArray['marylns'],
        'valorNaCarteira',
        'addr1qxqktk26vlern6ma3vpadvnxruu0ynfcug0x9k9jx8hh4sulur0lw3c226z0rrzvkkd0katsh2vhr6gzuuhfm9m9dp8qf96ajq'
    )
);
*/