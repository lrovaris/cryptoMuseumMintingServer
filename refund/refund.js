const https = require("https");

const { cardanocliJs, getEnv } = require("../cardano");

let wallet;

if (getEnv() === "testnet") {
	wallet = cardanocliJs.wallet("testNetWallet");
} else {
	wallet = cardanocliJs.wallet("cryptoMuseumFORREAL");
}

let utxos = {};

const getBaseUrl = function () {
	return `https://cardano-${getEnv()}.blockfrost.io/api/v0/txs/`;
};

const getProjectId = function () {
	let env = getEnv();

	if (env === "testnet") {
		return "0fe5Tr17FcTWgQtajiWrzYO8XIlqyWyG";
	}

	if (env === "mainnet") {
		return "ZEAnHjNNMQZkVYCnbanoywmNJx3UDHBz";
	}

	throw "wtf, nunca deveria chegar aqui";
};

const getAddressByTransactionId = function (transactionId, callback) {
	const url = `${getBaseUrl()}/${transactionId}/utxos`;

	https.get(
		url,
		{
			headers: {
				project_id: getProjectId(),
			},
		},
		(res) => {
			let response = "";

			res.on("data", (d) => {
				response += d;
			});

			res.on("end", function () {
				jsonResponse = JSON.parse(response);

				var response = jsonResponse.outputs.find( value => { value.address !== wallet.paymentAddr})

				callback(response);
			});
		}
	);
};

const refundHandler = function (req, res) {
	const currentUtxos = wallet.balance().utxo;

	let refunds = [];

	for (let i = 0; i < currentUtxos.length; i++) {
		const utxo = currentUtxos[i];

		utxo.txHash;

		if (utxos[utxo.txHash] === true) {


			 getAddressByTransactionId(utxo.txHash, (address) => {

				 const refundValue = utxo.value.lovelace;

				 refunds = [
					 ...refunds,
					 { address: address, value: refundValue, txHash: utxo.txHash },
				 ];

				 makeRefund(address, refundValue, utxo);

				 utxos[utxo.txHash] = false;

			});

		} else {
			utxos[utxo.txHash] = true;
		}
	}

	console.table(refunds);

	res
		.status(200)
		.json({ message: "refund array updated", data: JSON.stringify(refunds) });
};

const makeRefund = function (receiver, refundValue, utxo) {
	const sender = wallet;

	const txInfo = {
		txIn: [utxo],
		txOut: [
			{
				address: receiver,
				value: {
					lovelace: refundValue,
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

	txInfo.txOut[0].value.lovelace -= fee;

	const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee });

	const txSigned = cardanocliJs.transactionSign({
		txBody: tx,
		signingKeys: [sender.payment.skey],
	});

	const txHash = cardanocliJs.transactionSubmit(txSigned);

	console.log(txHash);
};

module.exports = { getAddressByTransactionId, refundHandler };
