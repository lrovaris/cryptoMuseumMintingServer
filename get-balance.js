const cardano = require("./cardano")

const sender = cardano.wallet("cryptoMuseumTest")

console.log(
    sender.balance()
)

function getBalance() {
    return sender.balance()
}

module.exports = getBalance()
