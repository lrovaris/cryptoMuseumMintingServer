const getEnv = function () {
	const env = process.argv[2];
	if (env === "prod") {
		return "mainnet";
	} else if (env === "test") {
		return "testnet";
	} else {
		throw "Ambiente não definido";
	}
};

module.exports = { getEnv };
