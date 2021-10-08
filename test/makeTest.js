const { cardanocliJs } = require("../cardano");

const getFakeWallets = function () {
	let wallets = [];

	for (let index = 0; index < 10; index++) {
		wallets = [...wallets, cardanocliJs.wallet(`fake-wallet-${index}`)];
	}

	return wallets;
};

const getFakeWalletById = function (id) {
	return cardanocliJs.wallet(`fake-wallet-${index}`);
};

const getTestInformation = function () {
	const clientId = procces.argv[3];
	const transactionValue = procces.argv[4];
	return { clientId, transactionValue };
};

const testTransaction = function () {
	const { clientId, transactionValue } = getTestInformation();
};

module.exports = { getFakeWallets };
