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



const x = function (_metadata1, _metadata2) {

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

    let txInfo = {};

    txInfo = {
        txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
        txOut: [
            {
                address: sender.paymentAddr,
                value: {
                    lovelace: sender.balance().value.lovelace, [ASSET_ID_1]: 1, [ASSET_ID_2]:1
                }
            }
        ],
        mint: [
            { action: "mint", quantity: 1, asset: ASSET_ID_1, script: mintScript },
            { action: "mint", quantity: 1, asset: ASSET_ID_2, script: mintScript },
        ],
        metadata_1,
        witnessCount: 2

    }
    raw = cardanocliJs.transactionBuildRaw(txInfo)
    fee = cardanocliJs.transactionCalculateMinFee({
        ...txInfo,
        txBody: raw,
        witnessCount: 3
    })
    txInfo.txOut[0].value.lovelace -= fee
    tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee })
    txSigned = cardanocliJs.transactionSign({
        txBody: tx,
        signingKeys: [sender.payment.skey]
    })

    txHash = cardanocliJs.transactionSubmit(txSigned)

    
}


x(metadataArray[20], metadataArray[39])




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