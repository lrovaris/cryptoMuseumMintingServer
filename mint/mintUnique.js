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

const sender = cardanocliJs.wallet('cryptoMuseumFinal')


const sendFakeAdas = function () {
    const receiver =
        "addr1qxcd03zuth7gjlxwsgswfzm0tvk2x9z9ghgeljq6xt89hynfxr35pxlj7p3c8kv7w3ue6t52049s0y2gm73ezpsyul8sp3nkkj";

    const txInfo = {
        txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: sender.paymentAddr,
                value: {
                    lovelace:
                        cardanocliJs.toLovelace(3),
                    'c3356ab50d63761797084b22c678317648aa6a501802d2e1c2b7ad9b.VitruvianManFrame': 1,
                    '065e9c59288aaa6bd64c839aae9c534965a4546a62321adb7c3f6efe.VitruvianMan': 2,
                    'fd9cafe6c9885725bd3bcb16d89b86ed422b19ef63719679501b337c.VitruvianManFrame': 1,
                    '33dc77e72fc27f435c594da81d324eb0aa9f15c0b69f24ac053fdac6.TheFallenAngel': 2,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.ThePersistenceofMemory': 1,
                    'fd9cafe6c9885725bd3bcb16d89b86ed422b19ef63719679501b337c.Nighthawks': 2,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.LadywithanErmine': 1,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.AlmondBlossom': 1,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.MonaLisa': 1,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.CafeTerraceAtNight': 7,
                    '32d52c2e0f49c8aec2830e3d1bb27a5e12bf1e7b0bac84b62a55ac32.SalvatoreMundi': 1
                },
            },
            {
                address: receiver,
                value: {
                    lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(3),
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