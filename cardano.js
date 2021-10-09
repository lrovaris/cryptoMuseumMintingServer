const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

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

const dir = path.join(os.homedir(), "cryptoMuseumMintingServer");

const shelleyPath = path.join(
	os.homedir(),
	`${getEnv()}-relay`,
	`${getEnv()}-shelley-genesis.json`
);

const cardanocliJs = new CardanocliJs({
	//   era: "mary",
	network: getEnv() == "testnet" ? "testnet-magic 1097911063" : "mainnet",
	dir,
	shelleyGenesisPath: shelleyPath,
});

module.exports = { cardanocliJs, getEnv };
