const { cardanocliJs } = require("../cardano");

const { getEnv } = require("./getEnv");

const { getFakeWalletById } = require("./test/utils");

let wallet;

if (getEnv() === "testnet") {
    wallet = cardanocliJs.wallet("testNetWallet");
} else {
    wallet = cardanocliJs.wallet("cryptoMuseumHalloween");
}

const sender = wallet;

const mintScript = {
    keyHash: cardanocliJs.addressKeyHash(wallet.name),
    type: "sig",
};
const POLICY_ID = cardanocliJs.transactionPolicyid(mintScript);

const carteiraMichel =
    "addr1qy0md3978mwx2z3a8rlywdpknmc655g6tdj2qy3a5veq6qk50ap8s0se070jvgdqzvhsa9nnv3hfyhng7nlf8pdf92tsx4v4af";

const carteiraNicola =
    "addr1q9zhz9q6a5et7863hy88kkk8zxrdzmjhe4sgnhcxrhqtm6955xueark5lyvkkl9696p3sr65cehxcfjr4dtadllv0n9q0wfysm";

const carteiraRovaris =
    "addr1qxcd03zuth7gjlxwsgswfzm0tvk2x9z9ghgeljq6xt89hynfxr35pxlj7p3c8kv7w3ue6t52049s0y2gm73ezpsyul8sp3nkkj";

const createTxOut = function (addressToSend, ASSET_ID, value) {
    if (getEnv() === "testnet") {
        return testTxOut(addressToSend, ASSET_ID, value);
    }

    if (getEnv() === "mainnet") {
        return prodTxOut(addressToSend, ASSET_ID, value);
    }

    throw "aaaaaaaaaaa";
};

const prodTxOut = function (addressToSend, ASSET_ID, value) {
    let valorAtual = value;

    const valorRovaris = cardanocliJs.toLovelace(1);

    valorAtual -= valorRovaris;

    const valorCliente = cardanocliJs.toLovelace(1.5);

    valorAtual -= valorCliente;

    const valorMichel = Math.floor(0.4 * valorAtual);

    valorAtual -= valorMichel;

    const valorNicola = valorAtual;

    let txOutArray = [
        {
            address: carteiraNicola,
            value: { lovelace: valorNicola },
        },
        {
            address: carteiraMichel,
            value: { lovelace: valorMichel },
        },

        {
            address: carteiraRovaris,
            value: { lovelace: valorRovaris },
        },

        {
            address: addressToSend,
            value: {
                lovelace: valorCliente,
                [ASSET_ID]: 1,
            },
        },
    ];

    return txOutArray;
};

const testTxOut = function (addressToSend, ASSET_ID, value) {
    const carteiraUm = getFakeWalletById(1).paymentAddr;

    const carteiraDois = getFakeWalletById(2).paymentAddr;

    const carteiraTres = getFakeWalletById(3).paymentAddr;

    let valorAtual = value;

    const valorUm = cardanocliJs.toLovelace(1);

    valorAtual -= valorUm;

    const valorCliente = cardanocliJs.toLovelace(1.5);

    valorAtual -= valorCliente;

    const valorDois = Math.floor(0.25 * valorAtual);

    valorAtual -= valorDois;

    const valorTres = valorAtual;

    let txOutArray = [
        {
            address: carteiraTres,
            value: { lovelace: valorTres },
        },
        {
            address: carteiraDois,
            value: { lovelace: valorDois },
        },

        {
            address: carteiraUm,
            value: { lovelace: valorUm },
        },

        {
            address: addressToSend,
            value: {
                lovelace: valorCliente,
                [ASSET_ID]: 1,
            },
        },
    ];

    return txOutArray;
};

const mintHalloween = function (_metadata, value, addressToSend) {
    uxtoArray = cardanocliJs.queryUtxo(sender.paymentAddr);

    let txIn = uxtoArray.find(
        (element) => element.value.lovelace.toString() === value.toString()
    );

    const metadata = {
        721: {
            [POLICY_ID]: {
                [_metadata.name.replace(/\s/g, "")]: {},
            },
        },
    };

    metadata["721"][`${POLICY_ID}`][_metadata.name.replace(/\s/g, "")] =
        _metadata;
    const ASSET_ID = `${POLICY_ID}.${_metadata.name.replace(/\s/g, "")}`;

    let txInfo = {};

    txInfo = {
        txIn: [txIn],
        txOut: createTxOut(addressToSend, ASSET_ID, value),
        mint: [
            { action: "mint", quantity: 1, asset: ASSET_ID, script: mintScript },
        ],
        metadata,
        witnessCount: 2,
    };

    const raw = cardanocliJs.transactionBuildRaw(txInfo);

    const fee = cardanocliJs.transactionCalculateMinFee({
                                                            ...txInfo,
                                                            txBody: raw,
                                                            witnessCount: 2,
                                                        });

    txInfo.txOut[0].value.lovelace -= fee;

    const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee });
    const txSigned = cardanocliJs.transactionSign({
                                                      txBody: tx,
                                                      signingKeys: [sender.payment.skey],
                                                  });

    return txSigned;
};

module.exports = { mintHalloween };
