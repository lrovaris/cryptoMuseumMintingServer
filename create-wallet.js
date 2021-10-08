const {cardanocliJs , getEnv} = require("./cardano")

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

createWallet("testNetWallet")