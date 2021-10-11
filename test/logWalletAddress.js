const { getFakeWallets } = require("./utils");

const logWalletAddresses = function () {
	const wallets = getFakeWallets();

	for (let i = 0; i < wallets.length; i++) {
		console.log(JSON.stringify(wallets[i].balance(), null,4));
	}
};

logWalletAddresses();
