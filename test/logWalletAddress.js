const { cardanocliJs } = require("../cardano");

const { getFakeWallets } = require("./makeTest");

const logWalletAddresses = function () {
	const wallets = getFakeWallets();

	for (let i = 0; i < wallets.length; i++) {
		console.log(wallets[i].paymentAddr);
	}
};

logWalletAddresses();
