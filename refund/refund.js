//const { getEnv } = require("../cardano");
const https = require("https");

function getEnv() {
	const env = process.argv[2];
	if (env === "prod") {
		return "mainnet";
	} else if (env === "test") {
		return "testnet";
	} else {
		throw "Ambiente não definido";
	}
}

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

				callback(jsonResponse.outputs[1].address);
			});
		}
	);
};

module.exports = { getAddressByTransactionId };
