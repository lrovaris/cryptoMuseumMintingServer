const cardano = require("./cardano")


    // 1. Get the wallet

    const wallet = cardano.wallet("ADAPI")

// 2. Define mint script

    const mintScript = {
        keyHash: cardano.addressKeyHash(wallet.name),
        type: "sig"
    }
// 3. Create POLICY_ID
    const POLICY_ID = cardano.transactionPolicyid(mintScript)
// 4. Define ASSET_NAME
// 7. Define transaction

const tx = {
    txIn: wallet.balance().utxo,
    txOut: [
        {
            address: wallet.paymentAddr,
            value: { ...wallet.balance().value, [ASSET_ID]: 1 }
        }
    ],
    mint: {
        actions: [{ type: "mint", quantity: 1, asset: ASSET_ID }],
        script: [mintScript]
    },
    metadata,
    witnessCount: 2
}

// 8. Build transaction

const buildTransaction = (tx) => {

    const raw = cardano.transactionBuildRaw(tx)
    const fee = cardano.transactionCalculateMinFee({
        ...tx,
        txBody: raw
    })

    tx.txOut[0].value.lovelace -= fee

    return cardano.transactionBuildRaw({ ...tx, fee })
}

const raw = buildTransaction(tx)

// 9. Sign transaction

const signTransaction = (wallet, tx) => {

    return cardano.transactionSign({
        signingKeys: [wallet.payment.skey, wallet.payment.skey],
        txBody: tx
    })
}

const signed = signTransaction(wallet, raw)

// 10. Submit transaction

const txHash = cardano.transactionSubmit(signed)

console.log(txHash)

