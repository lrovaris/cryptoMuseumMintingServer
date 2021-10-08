const { getFakeWalletById } = require("./utils");

const { sendFakeAdas } = require("./sendFakeAdasFromFakeWallets");

const getTestInformation = function () {
	const clientId = process.argv[3];
	const transactionValue = process.argv[4];
	return { clientId, transactionValue };
};

const testTransaction = function () {
	const { clientId, transactionValue } = getTestInformation();

	const wallet = getFakeWalletById(clientId);

	sendFakeAdas(wallet, transactionValue);
};

testTransaction();
