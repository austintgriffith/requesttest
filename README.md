# stupid simple way to test http requesting off the chain 


Fire up the dev env:
```
testrpc
truffle compile
truffle migrate --reset
```

Get balances:
```
node getBalances.js
```

One script would send a request to the contract with a little bit of ether:
```
node sendRequest.js 
```

Then, another script would pick that request up and make an http request, get the data back, and write it to the contract
```
node doRequestAndSendResponse.js
```
(this script is paid out the amount that the previous script paid in)

The first script could then get the response back:
```
node getResponse.js
```


