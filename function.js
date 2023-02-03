const Web3 = require('web3');
const web3 = new Web3('https://goerli.infura.io/v3/d7d55ab3c2d0480fb55e67b6def4cfe1');
const ethers = require('ethers');
const bip39 = require('bip39');
const ERC20 = require('./erc20.abi.json');


//create account from mnemonic
function createFroMnemonic(){
    try {
        const mnemo = bip39.generateMnemonic();
        const wallet = ethers.Wallet.fromMnemonic(mnemo);
        //console.log(wallet.address,wallet.privateKey);
        return wallet;
    } catch (error) {
        console.log(error);
    }    
}

//create wallet from mnemonic
function accountFroMnemonic(mnemonic){
    //validate mnemonic
    const isValid = bip39.validateMnemonic(mnemonic);
    if (isValid) {
        const wallet = ethers.Wallet.fromMnemonic(mnemonic);
        console.log(wallet.address);
        return wallet
    } else {
        console.log('invalid wallet mnemonic');
    }
}

//create account in eth without mnemonic
function createAccountEth(key){
    const account = web3.eth.accounts.create();
    if (key === 'public') {
        console.log('publicKey: ' + account.address);
        return(account.address);
    } else if (key === 'secret'){
        console.log('secretKey: ' + account.privateKey);
        //saving wallet
        //web3.eth.accounts.wallet.add(account.privateKey)
        return(account.address);
    }else{
        console.log('publicKey: ' + account.address + '\n' +
                    'secretKey: ' + account.privateKey);
        return account;
    }
}

//get eth balance
async function getBalanceEth(publicKey){
    try {
        const balance = await web3.eth.getBalance(publicKey);
        const wei = web3.utils.fromWei(balance, 'ether');
        console.log('balance eth: ' + wei);
        return wei
    } catch (error) {
        console.log(error);
    }
}

//send eth transaction
async function sendTransactionEth(from, to, value){
    try {
        const amount = Math.pow(10,18)*value;
        const sendEth = await web3.eth.sendTransaction({from:web3.eth.accounts.wallet.add(from),to:to,value:amount,gas:210000,gasPrice:web3.eth.gasPrice});
        console.log(sendEth);
        return sendEth;

    } catch (error) {
        console.log(error);
        return error
    }
}

//sign transaction(send eth transaction will be with signed first)
async function signTransaction(){
    const tx = sendTransactionEth('0x30c37fd1abef7b4a1893cff90aed3f7fc4bb564d55be14b4f72032f50e4aa28a','0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',1000,210000,210000);
    try {
        const sngTrns = await web3.eth.signTransaction(tx ,'0x3535353535353535353535353535353535353535')
        console.log(sngTrns);
    } catch (error) {
        console.log(error);
    }
}


//A*D*S(YD*(SYD&(D&(DTS&(T???.WORKING AREA.///////)()*E(*(*(*WQ(*E()))))
async function getTokenBalance(tokenAddress,puKey){

    try {
        const contract = new web3.eth.Contract(ERC20, tokenAddress);
        const balance = await contract.methods.balanceOf(puKey);
        console.log(balance);
    } catch (error) {
        
    }
   
}

// //send erc20 tokens
// async function sendTokens(tokenAddress,to,amount){
//     try {
//         const contract = new ERC20(web3,tokenAddress);
//         const transfer = await contract.transfer(to,amount);
//         console.log(transfer);
//         return transfer;        
//     } catch (error) {
//         console.log(error);
//     }
// }

// //balance of erc20 tokens
// async function balanceTokens(tokenAddress,publicAdress){
//     try {
//         const contract = new ERC20(web3,tokenAddress);
//         const balance = await contract.balanceOf(publicAdress);
//         console.log(balance);
//         return balance;        
//     } catch (error) {
//         console.log(error);
//     }
// }


////////DRAW////////////////////////////////////////////////
const acc = accountFroMnemonic('keen sail orient half paper coast push section outside saddle cycle summer');
getTokenBalance('0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',acc.address)
//sendTransactionEth(acc.privateKey,'0xaFF63138A5ec37f3b36bF5C83b8FC639E2857942',0.01)
//getBalanceEth(acc.address)
//accountFroMnemonic('able sail orient half paper coast push section outside saddle cycle summer');
