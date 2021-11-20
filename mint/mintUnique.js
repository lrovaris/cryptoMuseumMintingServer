const { getEnv } = require("../getEnv");
const { cardanocliJs } = require("../cardano");
const metadataArray = require("../metadatas");
const { mintAsset } = require("../mintAsset");
const { sendFakeAda }  = require('../test/sendFakeAdasFromFakeWallets.js')
const {sendFakeAdas} = require("../test/sendFakeAdasFromFakeWallets");

let wallet;

if (getEnv() === "testnet") {
    wallet = cardanocliJs.wallet("testNetWallet");
} else {
    wallet = cardanocliJs.wallet("cryptoMuseumFORREAL");
}

let txInfo
let txIn
let txOut
const sender = wallet;

const mintScript = {
    keyHash: cardanocliJs.addressKeyHash(wallet.name),
    type: "sig",
};
const POLICY_ID = cardanocliJs.transactionPolicyid(mintScript);
const metadata_1 = {
    721: {
        [POLICY_ID]: {
            [_metadata1.name.replace(/\s/g, "")]: {},
        },
    },
};

metadata_1["721"][`${POLICY_ID}`][_metadata1.name.replace(/\s/g, "")] =
    _metadata1;
const ASSET_ID_1 = `${POLICY_ID}.${_metadata1.name.replace(/\s/g, "")}`;


const metadata_2 = {
    721: {
        [POLICY_ID]: {
            [_metadata2.name.replace(/\s/g, "")]: {},
        },
    },
};

metadata_2["721"][`${POLICY_ID}`][_metadata2.name.replace(/\s/g, "")] =
    _metadata2;
const ASSET_ID_2 = `${POLICY_ID}.${_metadata2.name.replace(/\s/g, "")}`;
const x = function () {

    const receiver = "addr1qy0md3978mwx2z3a8rlywdpknmc655g6tdj2qy3a5veq6qk50ap8s0se070jvgdqzvhsa9nnv3hfyhng7nlf8pdf92tsx4v4af"
    const txInfo = {
        txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: sender.paymentAddr,
                value: {
                    lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(3)
                }
            },
            {
                address: receiver,
                value: {
                    lovelace: cardanocliJs.toLovelace(3), '6654c3dca29414a1404479fe989fae1794623d2c4733ca8891645c7f.WandererAbovetheSeaofFog' :1, '6654c3dca29414a1404479fe989fae1794623d2c4733ca8891645c7f.WomanWithAParassol': 1
                }
            }
        ]
    }

    console.log(txInfo);

    const raw = cardanocliJs.transactionBuildRaw(txInfo)

    const fee = cardanocliJs.transactionCalculateMinFee({
        ...txInfo,
        txBody: raw,
        witnessCount: 1
    })

    txInfo.txOut[0].value.lovelace -= fee

    const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee })

    const txSigned = cardanocliJs.transactionSign({
        txBody: tx,
        signingKeys: [sender.payment.skey]
    })

    const txHash = cardanocliJs.transactionSubmit(txSigned)

    console.log(txHash)


}


x()




/*

let transaction = cardanocliJs.transactionSubmit(
    mintAsset(
        metadata_1Array[34],
        10000000,
        'addr1qxqktk26vlern6ma3vpadvnxruu0ynfcug0x9k9jx8hh4sulur0lw3c226z0rrzvkkd0katsh2vhr6gzuuhfm9m9dp8qf96ajq'
    )
);

console.log(cardanocliJs.wallet('ADAPI').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal').balance())
console.log(cardanocliJs.wallet('cryptoMuseumFinal2').balance())
console.log(cardanocliJs.wallet('cryptoMuseum').balance())
console.log(cardanocliJs.wallet('cryptoMuseumTest').balance())
console.log("aaa")


let transaction = cardanocliJs.transactionSubmit(
    mintAsset(
        metadata_1Array['marylns'],
        'valorNaCarteira',
        'addr1qxqktk26vlern6ma3vpadvnxruu0ynfcug0x9k9jx8hh4sulur0lw3c226z0rrzvkkd0katsh2vhr6gzuuhfm9m9dp8qf96ajq'
    )
);
*/