let Web3 = require("web3")
let fs = require("fs")
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
//console.log(web3.eth.accounts[0])


for(let a in web3.eth.accounts){
  console.log("account "+web3.eth.accounts[a]+" has "+web3.fromWei(web3.eth.getBalance(web3.eth.accounts[a])))
}

let RequestTest = JSON.parse(fs.readFileSync("./build/contracts/RequestTest.json"))
let RequestTestAddress = RequestTest.networks[Object.keys(RequestTest.networks)[0]].address

console.log("the current contract balance is ",web3.fromWei(web3.eth.getBalance(RequestTestAddress)))
