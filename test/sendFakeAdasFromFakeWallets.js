const { cardanocliJs } = require("../cardano");

const sendFakeAdas = function (sender, transactionValue) {
	const receiver =
		"addr_test1qrcheft7r9c549hfqj5q6ch7jntm4dzsxuj6ymyt6avejacf9s9jkcvgmlju0qxppat6ezcevcjxalxfjk0uslz3uh8sqkzh6t";

	const txInfo = {
		txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
		txOut: [
			{
				address: sender.paymentAddr,
				value: {
					lovelace:
						sender.balance().value.lovelace -
						cardanocliJs.toLovelace(transactionValue),
				},
			},
			{
				address: receiver,
				value: {
					lovelace: cardanocliJs.toLovelace(transactionValue),
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

module.exports = { sendFakeAdas };
