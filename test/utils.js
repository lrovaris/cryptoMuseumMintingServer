const { cardanocliJs } = require("../cardano");

const getFakeWallets = function () {
	let wallets = [];

	for (let index = 0; index < 10; index++) {
		wallets = [...wallets, cardanocliJs.wallet(`fake-wallet-${index}`)];
	}

	return wallets;
};

const getFakeWalletById = function (id) {
	return cardanocliJs.wallet(`fake-wallet-${id}`);
};

module.exports = { getFakeWallets, getFakeWalletById };
