const { cardanocliJs } = require("../cardano");

const createWallet = (account) => {
	const payment = cardanocliJs.addressKeyGen(account);
	const stake = cardanocliJs.stakeAddressKeyGen(account);
	cardanocliJs.stakeAddressBuild(account);
	cardanocliJs.addressBuild(account, {
		paymentVkey: payment.vkey,
		stakeVkey: stake.vkey,
	});
	return cardanocliJs.wallet(account);
};

const createFakeWallets = function () {
	for (let index = 0; index < 10; index++) {
		createWallet(`fake-wallet-${index}`);
	}
};

createFakeWallets();
