const express = require("express");
const router = express.Router();
const { cardanocliJs } = require("./cardano");

const { getEnv } = require("./getEnv");

const metadataArray = require("./metadatas");
const list = require("./listOfValues");

const { mintAsset } = require("./mintAsset");

const { refundHandler } = require("./refund/refund");

let wallet;

if (getEnv() === "testnet") {
	wallet = cardanocliJs.wallet("testNetWallet");
} else {
	wallet = cardanocliJs.wallet("cryptoMuseumFORREAL");
}

const quantitysArray = [0,
	7,
	9,
	17,
	0,
	5,
	5,
	0,
	0,
	0,
	0,
	11,
	7,
	14,
	17,
	0,
	25,
	2,
	15,
	15,
	25,
	0,
	10,
	20,
	15,
	0,
	30,
	15,
	5,
	0,
	20,
	15,
	5,
	30,
	0,
	15,
	15,
	20,
	5,
	10,
	10,
	12,
	15,
	15,
	20,
	20,
	15,
	3,
	5,
	10
];

router.get("/", (req, res) => {
	return res.status(200).json({ Message: "Working" });
});

router.get("/refund", refundHandler);

router.get("/test", (req, res) => {
	return res.status(200).json({ message: "test working" });
});

router.post("/test", async (req, res) => {
	console.log(JSON.stringify(wallet.balance(), null, 4));

	return res.status(200).json({ message: "working" });
});

router.post("/isItAvaibleToMint", (req, res) => {
	if (quantitysArray[req.body.number] <= 0) {
		return res.status(200).json({
			message: "sold out",
			status: false,
			left: +quantitysArray[req.body.number],
		});
	}
	return res.status(200).json({
		left: +quantitysArray[req.body.number],
		message: "Mint yours now!",
		status: true,
	});
});

router.post("/checkValue", (req, res) => {
	for (let j = 0; j < wallet.balance().utxo.length; j++) {
		if (
			wallet.balance().utxo[j].value.lovelace.toString() ===
			req.body.value.toString()
		) {
			return res.status(200).json({ status: true });
		}
	}
	return res.status(200).json({ status: false });
});

router.post("/mint", async (req, res) => {
	if (quantitysArray[+req.body.number - +1] == 0) {
		return res.status(200).json({ message: "sold out" });
	}
	if (req.body.value < list[req.body.number - 1]) {
		return res.status(200).json({ rs: "not today :3" });
	}

	quantitysArray[req.body.number - 1] =
		+quantitysArray[req.body.number - 1] - +1;

	let x = wallet.balance().utxo.find((utxo) => {
		return utxo.value.lovelace.toString() == req.body.value.toString();
	});
	if (x) {
		let transaction = cardanocliJs.transactionSubmit(
			mintAsset(
				metadataArray[req.body.number - 1],
				req.body.value,
				req.body.receiver
			)
		);

		return res.status(200).json({ message: "check your wallet" });
	}
	quantitysArray[req.body.number - 1] =
		+quantitysArray[req.body.number - 1] + +1;
	return res.status(200).json({ message: "didn't receive yet" });
});

module.exports = router;

/*
const receiver = "addr_test1qrcheft7r9c549hfqj5q6ch7jntm4dzsxuj6ymyt6avejacf9s9jkcvgmlju0qxppat6ezcevcjxalxfjk0uslz3uh8sqkzh6t"
  const txInfo = {
    txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
    txOut: [
      {
        address: sender.paymentAddr,
        value: {
          lovelace: sender.balance().value.lovelace - cardanocliJs.toLovelace(1.5)
        }
      },
      {
        address: receiver,
        value: {
          lovelace: cardanocliJs.toLovelace(1.5),
          "33dc77e72fc27f435c594da81d324eb0aa9f15c0b69f24ac053fdac6.TheFallenTest" : 1
        }
      }
    ]
  }

  console.log(txInfo);

  const raw = cardanocliJs.transactionBuildRaw(txInfo)

  const fee = cardanocliJs.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
  })

  txInfo.txOut[0].value.lovelace -= fee

  const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee })

  const txSigned = cardanocliJs.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  const txHash = cardanocliJs.transactionSubmit(txSigned)

  console.log(txHash)






const mintScript = {
  keyHash: cardanocliJs.addressKeyHash(wallet.name),
  type: "sig"
}
const POLICY_ID = "fb3bc09879b03b4e1566b8e8b4e448449d8d1ee18d6b4e03e5431ce1"


// ----------------------------------
function buildMetadata(_metadata) {

  const metadata = {
    721: {
      [POLICY_ID]: {

      }
    }
  }
  metadata["721"][`${POLICY_ID}`] = _metadata;

  return metadata

}


{
   fb3bc09879b03b4e1566b8e8b4e448449d8d1ee18d6b4e03e5431ce1: {
      TheFallenAngel: {
         files: [
            {
               mediaType: "video/mp4",
               name: "The Fallen Angel",
               src: "ipfs://QmNgaaUhCxBcBS8UQGm6o9HzFZjMa5TKLd5kzQZ4eyvCNx"
            },
            {
               mediaType: "image/png",
               name: "The Fallen Angel Static",
               src: "ipfs://QmQmK7ewZhJy73nfguTRxVkES2zF9wEJpi6WJQThiJ3phD"
            }
         ],
         image: "ipfs://QmV3VVq2hWaCfHoV6fRr73Zj18MXNTZsyR7SxCDzUZYTXC",
         mediaType: "image/png",
         name: "The Fallen Angel",
         Description: Inspired by John Milton's epic poem "Paradise Lost", the painting depicts a handsome devil, The Fallen Angel. Cast out of heaven and fallen from grace, Lucifer shelters his face behind flexed arms and his tearful gaze tell us his motivation is rooted in revenge and that he shall rise again.
         Author: A. Cabanel
         Card number: 1
         Tier: masterpiece
         First Collection
         twitter: https://twitter.com/CryptoMuseumNFT
         Discord: https://discord.com/invite/pA5dMgr4UY
         website: https://crypto-museum.io/
      }
   }
}


QmV3VVq2hWaCfHoV6fRr73Zj18MXNTZsyR7SxCDzUZYTXC
PINTURA

QmQmK7ewZhJy73nfguTRxVkES2zF9wEJpi6WJQThiJ3phD
IMAGEM PARADA

QmNgaaUhCxBcBS8UQGm6o9HzFZjMa5TKLd5kzQZ4eyvCNx
VIDEO

Name: The Fallen Angel
Description: Inspired by John Milton's epic poem "Paradise Lost", the painting depicts a handsome devil, The Fallen Angel. Cast out of heaven and fallen from grace, Lucifer shelters his face behind flexed arms and his tearful gaze tell us his motivation is rooted in revenge and that he shall rise again.
Author: A. Cabanel
Card number: 1
Tier: masterpiece
First Collection
twitter: https://twitter.com/CryptoMuseumNFT
Discord: https://discord.com/invite/pA5dMgr4UY
website: https://crypto-museum.io/



  const ASSET_NAME = "theFallenTest6"
  const ASSET_ID = POLICY_ID + "." + ASSET_NAME


  const metadata = {
    721: {
      [POLICY_ID]: {
        [ASSET_NAME]: {
          files: [
            {
              mediaType: "video/mp4",
              name: "The Fallen Angel",
              src: "ipfs://QmNgaaUhCxBcBS8UQGm6o9HzFZjMa5TKLd5kzQZ4eyvCNx"
            },
            {
              mediaType: "image/png",
              name: "The Fallen Angel Static",
              src: "ipfs://QmQmK7ewZhJy73nfguTRxVkES2zF9wEJpi6WJQThiJ3phD"
            },
            {
              mediaType: "image/png",
              name: "The Fallen Angel Frame",
              src: "ipfs://QmV3VVq2hWaCfHoV6fRr73Zj18MXNTZsyR7SxCDzUZYTXC"
            }
          ],
          image: "ipfs://QmNgaaUhCxBcBS8UQGm6o9HzFZjMa5TKLd5kzQZ4eyvCNx",
          type: "video/mp4",
          name: "The Fallen Angel",
          author: "A. Cabanel",
          cardNumber: "1",
          tier: "Masterpiece",
          collection: "First Collection",
          twitter: "https://twitter.com/CryptoMuseumNFT",
          discord: "https://discord.com/invite/pA5dMgr4UY",
          website: "https://crypto-museum.io/"
        }
      }
    }
  }

  const txInfo = {
    txIn: cardanocliJs.queryUtxo(sender.paymentAddr),
    txOut: [
      {
        address: sender.paymentAddr,
        value: {
          lovelace: sender.balance().value.lovelace, [ASSET_ID]: 1
        }
      }
    ],
    mint: [
      { action: "mint", quantity: 1, asset: ASSET_ID, script: mintScript },
    ],
    metadata,
    witnessCount: 2

  }
  const raw = cardanocliJs.transactionBuildRaw(txInfo)
  const fee = cardanocliJs.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 3
  })
  txInfo.txOut[0].value.lovelace -= fee
  const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee })
  const txSigned = cardanocliJs.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  const txHash = cardanocliJs.transactionSubmit(txSigned)

	const receiver = "addr_test1qzmv5cufkwnycavj6s9f465c5hr5ew248pjwt4x49kvlapqpcup9jp0rhv5gj2frq8ywa36kh36qukgaantlzqx0l33qm2jyvx"
	const txInfo = {
		txIn: cardanocliJs.queryUtxo(wallet.paymentAddr),
		txOut: [
			{
				address: receiver,
				value: {
					lovelace: wallet.balance().value.lovelace
				}
			}
		]
	}

	console.log(txInfo);

	const raw = cardanocliJs.transactionBuildRaw(txInfo)

	const fee = cardanocliJs.transactionCalculateMinFee({
															...txInfo,
															txBody: raw,
															witnessCount: 1
														})

	txInfo.txOut[0].value.lovelace -= fee

	const tx = cardanocliJs.transactionBuildRaw({ ...txInfo, fee })

	const txSigned = cardanocliJs.transactionSign({
													  txBody: tx,
													  signingKeys: [wallet.payment.skey]
												  })

	const txHash = cardanocliJs.transactionSubmit(txSigned)

	console.log(txHash)

*/
