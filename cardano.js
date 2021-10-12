const CardanocliJs = require("cardanocli-js");
const os = require("os");
const path = require("path");

const { getEnv } = require("./getEnv");

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

module.exports = { cardanocliJs };
