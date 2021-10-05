const express = require('express');
const router = express.Router();
//const balance = require('./get-balance')
const cardano = require("./cardano")
const metadataArray = require ("./metadatas")
const list = require ("./listOfValues")
const fs = require("fs");

const wallet = cardano.wallet("cryptoMuseumFORREAL")
const sender = wallet;
const mintScript = {
  keyHash: cardano.addressKeyHash(wallet.name),
  type: "sig"
}
const POLICY_ID = cardano.transactionPolicyid(mintScript);

let localFee = 0;

const quantitysArray = [
  4,
  30,
  15,
  20,
  9,
  25,
  25,
  30,
  10,
  2,
  3,
  15,
  15,
  20,
  30
]

const videos = []

fs.readdir("./videos", (err, files) => {
  files.forEach(file => {
    videos.push(file)
  });
});



function mintAsset(_metadata, value, addressToSend) {

  uxtoArray = cardano.queryUtxo(sender.paymentAddr)

  console.log(value)

  let txIn = uxtoArray.find(element => element.value.lovelace.toString() === value.toString() )

  console.log(txIn)

  const metadata = {
    721: {
      [POLICY_ID]: {
        [_metadata.name.replace(/\s/g, '')]: {

        }
      }
    }
  }

  metadata["721"][`${POLICY_ID}`][_metadata.name.replace(/\s/g, '')] = _metadata;
  const ASSET_ID = `${POLICY_ID}.${_metadata.name.replace(/\s/g, '')}`

    let txInfo = {}
    console.log(txInfo)

  if(value < 5000000) {
       txInfo = {
          txIn: [txIn],
          txOut: [
              {
                  address: sender.paymentAddr,
                  value: {
                      lovelace: txIn.value.lovelace - cardano.toLovelace(2.5)
                  }
              },
              {
                  address: addressToSend,
                  value: {
                      lovelace: cardano.toLovelace(1.5), [ASSET_ID]: 1
                  }
              },
              {
                  address: "addr1qxcd03zuth7gjlxwsgswfzm0tvk2x9z9ghgeljq6xt89hynfxr35pxlj7p3c8kv7w3ue6t52049s0y2gm73ezpsyul8sp3nkkj",
                  value: {
                      lovelace: cardano.toLovelace(1)
                  }
              }
          ],
          mint: [
              { action: "mint", quantity: 1, asset: ASSET_ID, script: mintScript },
          ],
          metadata,
          witnessCount: 2

      }
  }  else {

      michel = value - ((value - 2500000) * 0.25).toFixed(0)
      nicola = value - ((value - 2500000) * 0.75).toFixed(0)

        console.log(value)
        console.log("michel")
        console.log(michel)
        console.log("nicola")
        console.log(nicola)

       txInfo = {
          txIn: [txIn],
          txOut: [
              {
                  address: sender.paymentAddr,
                  value: {
                      lovelace: txIn.value.lovelace - (nicola + michel + cardano.toLovelace(2.5)) //cardano.toLovelace(2.5)
                  }
              },
              {
                  address: addressToSend,
                  value: {
                      lovelace: cardano.toLovelace(1.5), [ASSET_ID]: 1
                  }
              },
              {
                  address: "addr1qxcd03zuth7gjlxwsgswfzm0tvk2x9z9ghgeljq6xt89hynfxr35pxlj7p3c8kv7w3ue6t52049s0y2gm73ezpsyul8sp3nkkj", //rovaris
                  value: {
                      lovelace: cardano.toLovelace(1)
                  }
              },
              {
                  address: "addr1qy0md3978mwx2z3a8rlywdpknmc655g6tdj2qy3a5veq6qk50ap8s0se070jvgdqzvhsa9nnv3hfyhng7nlf8pdf92tsx4v4af", //michel
                  value: {
                      lovelace: michel
                  }
              },
              {
                  address: "addr1qxyjzd6xjmkmptc00qfmz8t7dcs3m5st2j40x48zkz45dp455xueark5lyvkkl9696p3sr65cehxcfjr4dtadllv0n9q5zpfa8",//nicola
                  value: {
                      lovelace: nicola
                  }
              }
          ],
          mint: [
              { action: "mint", quantity: 1, asset: ASSET_ID, script: mintScript },
          ],
          metadata,
          witnessCount: 2

      }
  }



  console.log(txInfo)

  const raw = cardano.transactionBuildRaw(txInfo)

  const fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 2
  })

  txInfo.txOut[0].value.lovelace -= fee


  const tx = cardano.transactionBuildRaw({ ...txInfo, fee })
  const txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  return txSigned;

}







router.get('/', (req,res) => {
  return res.status(200).json({"Message":"Working"});
})

router.get ('/test', (req,res) => {
  return res.status(200).json({"message":"test working"});
})

router.post ('/test', async (req,res) => {

    return res.status(200).json({"message":"working"});
})




router.post('/isItAvaibleToMint', (req,res) => {
  if (quantitysArray[req.body.number] <= 0) {
    return res.status(200).json({"message":"sold out", "status":false});
  }
  return res.status(200).json({"left":+quantitysArray[req.body.number], "message":"Mint yours now!", "status":true});
})

router.post('/checkValue', (req, res) => {

  for (let j = 0; j < wallet.balance().utxo.length; j++) {

    if(wallet.balance().utxo[j].value.lovelace.toString() === req.body.value.toString()) {
      return res.status(200).json({status:true});
    }
  }
  return res.status(200).json({status:false});
})

router.post ('/mint', async(req,res) => {

    console.log(wallet.balance())

  for (let i = 0; i < wallet.balance().utxo.length; i++){
    if(wallet.balance().utxo[i].value.lovelace.toString() === req.body.value.toString()){
      if (req.body.value < list[req.body.number - 1]) {
        return res.status(200).json({rs:"not today :3"});
      }
      cardano.transactionSubmit(mintAsset(metadataArray[req.body.number - 1], req.body.value, req.body.receiver))
      quantitysArray[req.body.number] = +quantitysArray[req.body.number] - +1
      res.status(200).json({"message":"check your wallet"})

    }
  }
  res.status(200).json({"message":"didn't received yet"});
})



router.get('/video/:id', (req, res) => {

  const id = req.params.id;



  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }


  const videoPath = './videos/'+videos[id];
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res)

  /*
  const { movieName } = req.params;
   const movieFile = `./movies/${movieName}`;
   fs.stat(movieFile, (err, stats) => {
     if (err) {
       console.log(err);
       return res.status(404).end('<h1>Movie Not found</h1>');
     }
     // Variáveis necessárias para montar o chunk header corretamente
     const { range } = req.headers;
     const { size } = stats;
     const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
     const end = size - 1;
     const chunkSize = (end - start) + 1;
     // Definindo headers de chunk
     res.set({
       'Content-Range': `bytes ${start}-${end}/${size}`,
       'Accept-Ranges': 'bytes',
       'Content-Length': chunkSize,
       'Content-Type': 'video/mp4'
     });
     // É importante usar status 206 - Partial Content para o streaming funcionar
     res.status(206);
     // Utilizando ReadStream do Node.js
     // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
     const stream = fs.createReadStream(movieFile, { start, end });
     stream.on('open', () => stream.pipe(res));
   */




})


module.exports = router;


/*
const receiver = "addr1q8sct235fa3h7jcluparwg6vz5vasss28wwlh2qk2xz4qzwhq6x7j6hhg950vm0yf5963rxtug7mm09cf26z9aaxl50qcwgjqq"
  const txInfo = {
    txIn: cardano.queryUtxo(sender.paymentAddr),
    txOut: [
      {
        address: sender.paymentAddr,
        value: {
          lovelace: sender.balance().value.lovelace - cardano.toLovelace(1.5)
        }
      },
      {
        address: receiver,
        value: {
          lovelace: cardano.toLovelace(1.5),
          "33dc77e72fc27f435c594da81d324eb0aa9f15c0b69f24ac053fdac6.TheFallenTest" : 1
        }
      }
    ]
  }

  console.log(txInfo);

  const raw = cardano.transactionBuildRaw(txInfo)

  const fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 1
  })

  txInfo.txOut[0].value.lovelace -= fee

  const tx = cardano.transactionBuildRaw({ ...txInfo, fee })

  const txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  const txHash = cardano.transactionSubmit(txSigned)

  console.log(txHash)






const mintScript = {
  keyHash: cardano.addressKeyHash(wallet.name),
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
    txIn: cardano.queryUtxo(sender.paymentAddr),
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
  const raw = cardano.transactionBuildRaw(txInfo)
  const fee = cardano.transactionCalculateMinFee({
    ...txInfo,
    txBody: raw,
    witnessCount: 3
  })
  txInfo.txOut[0].value.lovelace -= fee
  const tx = cardano.transactionBuildRaw({ ...txInfo, fee })
  const txSigned = cardano.transactionSign({
    txBody: tx,
    signingKeys: [sender.payment.skey]
  })

  const txHash = cardano.transactionSubmit(txSigned)

*/