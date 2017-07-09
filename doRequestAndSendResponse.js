let Web3 = require("web3")
let fs = require("fs")
var request = require('request');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//console.log(web3.eth.accounts[0])
let RequestTest = JSON.parse(fs.readFileSync("./build/contracts/RequestTest.json"))
let RequestTestAddress = RequestTest.networks[Object.keys(RequestTest.networks)[0]].address
let RequestTestAbi = RequestTest.abi
let requestTest = web3.eth.contract(RequestTestAbi).at(RequestTestAddress)


console.log("----\n current contract balance: ",web3.eth.getBalance(RequestTestAddress),"\n----\n")

let currentRequest = requestTest.request.call();
if(currentRequest&&currentRequest!=0){
  currentRequest = web3.toUtf8(currentRequest);
  currentRequest = unescape(encodeURIComponent(currentRequest))
  console.log("requesting: "+currentRequest)
  request(currentRequest, function (error, response, body) {
    //console.log('error:', error);
    //console.log('statusCode:', response && response.statusCode);

    console.log('sending sha3 of body:', body);

    let bodyHash = web3.sha3(body)

    console.log("\n------------------\nbody hash: ",bodyHash)

    requestTest.Response(""+bodyHash,{from: web3.eth.accounts[1],gas:100000},(error,tx)=>{
      if(error){console.log("ERROR: ",error)}
      else{
        console.log("TX: ",tx)
        console.log(web3.eth.getTransaction(tx))
      }
    })
    
  });
}else{
  console.log("request is empty... nothing to do.")
}
/*
console.log("greeting is "+requestTest.greet())

requestTest.Request("https://ifconfig.co/",{from: web3.eth.accounts[0],gas:100000,value:1},(error,tx)=>{
  if(error){console.log("ERROR: ",error)}
  else{
    console.log("TX: ",tx)
    console.log(web3.eth.getTransaction(tx))



  }
})
*/
//console.log("requestTx:",requestTx)
//
//Buffer.from("https://ifconfig.co/"), { gas: 200000 }
//console.log("request is now "+requestTest.request.call())
