let Web3 = require("web3")
let fs = require("fs")
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//console.log(web3.eth.accounts[0])
let RequestTest = JSON.parse(fs.readFileSync("./build/contracts/RequestTest.json"))
let RequestTestAddress = RequestTest.networks[Object.keys(RequestTest.networks)[0]].address
let RequestTestAbi = RequestTest.abi
let requestTest = web3.eth.contract(RequestTestAbi).at(RequestTestAddress)


console.log("----\n current contract balance: ",web3.eth.getBalance(RequestTestAddress),"\n----\n")

console.log("request starts as "+requestTest.request.call())

console.log("greeting is "+requestTest.greet())

requestTest.Request("https://ifconfig.co/",{from: web3.eth.accounts[0],gas:100000,value:web3.toWei(1,'ether')},(error,tx)=>{
  if(error){console.log("ERROR: ",error)}
  else{
    console.log("TX: ",tx)
    console.log(web3.eth.getTransaction(tx))
  }
})
//console.log("requestTx:",requestTx)
//
//Buffer.from("https://ifconfig.co/"), { gas: 200000 }
//console.log("request is now "+requestTest.request.call())
