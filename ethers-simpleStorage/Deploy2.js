// script 9


// 这章的big picture - 用 javascript 来 deploy 合约

    // 大致思路：把写好的.sol文件放入同一个folder
    // “yarn compile” 来 compile 这个 .sol 文件
    // 引入 ethers包 和 fs包
    // 配置 .abi .bin wallet, 然后 node Deploy2.js 部署合约
    // 使用 javascript 和合约交互，依然用 node Deploy2.js 查看交互结果

// 其他知识

    // abi 易读性
        // 为了方便读.abi中的内容，先将其重命名为json文件，
        // 然后从控制面板中的formatting document 把 其视窗调为json，然后再将其重命名为.abi
        // 此时的.abi文件非常易读

    // 私钥管理方法1
    // 私钥和RPC节点隐藏在环境变量文件中
        // 先 yarn add dotenv 安装 dotenv包，方便后续将变量隐藏在 .env 文件中
        // 添加一个.env文件，然后里面这么写: PRIVATE_KEY=...   (大写，无“”号)
        // 代码中这么调用: process.env.PRIVATE_KEY
        // 再添加一个.gitignore, 把“.env"放进去，这样push git的时候就不会把私钥push上去了

    // 私钥管理方法2
        // 如果还是担心会不小心push到github，那就直接在运行时这么运行也可以：
        // RPC_URL=http://127.0.0.1:7545 PRIVATE_KEY=0x0e343e4fcbf816240791a5485bcdce84b3862c3283d7727d1ffbd3818d2e4d92 node Deploy2.js
        // 然后用完马上 history --c

    // 私钥管理方法3 (例子：encrypt.js + Deploy4.js)
        // 用encryptKey.js创建一个加密私钥，然后删去.env中的PRIVATE_KEY 和 PRIVATE_KEY_PASSWORD



////////// 这是 javascript 中的 import 语句：//////////

// terminal中，用 "yarn add ethers" 安装了 ethers 这个库，然后就可以在 package.json 的 dependencies 中看到 ethers 了
// terminal中，用 “yarn add ganache" 安装了 ganache 这个库，可以在 package.json 的 dependencies 中看到 ganache
// terminal中，用 “yarn add dotenv" 安装了 dotenv 这个库，可以在 package.json 的 dependencies 中看到 ganache

// import ethers（ethers库用来组合已有的.abi .bin wallet, 然后真正部署合约，ethers就是一个api版本的 Remix IDE）
const ethers = require("ethers");
// import fs （fs库用来读取.abi文件和.bin文件）
const fs = require("fs-extra");
// 根据包的页面（https://www.npmjs.com/package/dotenv），import语句不需要一个变量承接：
require("dotenv").config();


// 让main函数变成 异步函数(asynchronous function)
async function main(){
    // 我们先安装local的blockchain “Ganache”。然后Ganache的节点是这个：http://127.0.0.1:7545，这个会用于我们本地测试
    // 设置区块链provider  = Ganache的节点。这个函数的包来自 ethers 包
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    // 设置好要部署的合约的abi，binary，要对其操作的wallet address，然后将他们通过contractFactory组合在一起
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = fs.readFileSync("./simpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./simpleStorage_sol_SimpleStorage.bin", "utf8");
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

    console.log("Deploying...");

    // 部署合约，异步函数，必须等待这个函数执行完成才能往下执行
    // 如果没有await关键字，程序直接往下执行，下面的 console.log(contract) 会 print 出 “pending”，而不是 contract details
    const contract  = await contractFactory.deploy(); // 可以在deploy()中定义gasLimit，gas等等具体细节

    // 上一步的contract成功deployed以后，等待1个区块确认，
    // 然后返回这个delpoyment的transaction信息，保存至 contractReceipt 变量
    const contractReceipt = await contract.deployTransaction.wait(1);

    /*
    Example:

        type: 2,
        chainId: 1337,
        nonce: 5,
        maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00', _isBigNumber: true },
        maxFeePerGas: BigNumber { _hex: '0x9c29cb22', _isBigNumber: true },
        gasPrice: null,
        gasLimit: BigNumber { _hex: '0x07f822', _isBigNumber: true },
        to: null,
        value: BigNumber { _hex: '0x00', _isBigNumber: true },
        data
    */
    console.log("Here is the transaction response: ");
    console.log(contract.deployTransaction);

    /*
    Example:

        to: null,
        from: '0x48f8710052a5f6283595D76B209324657Eb32b1d',
        contractAddress: '0x310496257EF6d3930009B114bF449C130DfC5463',
        transactionIndex: 0,
        gasUsed
    */
    console.log("Here is the transaction details: ");
    console.log(contractReceipt);

    /*
    所有信息（包括函数的calldata）
    */
    console.log("Here is the contract details: ");
    // 执行完成，print所有此合约的信息
    console.log(contract);

    // 上面我们已经确保合约部署，甚至等待了1个区块来确认
    // 现在，我们来和这个智能合约中的函数交互
    // 1. 首先调用这个合约的.retrieve()函数
    const currentFavoriteNumber = await contract.retrieve();
    // 现在我们要打印看看是否正确retrieve：console.log(currentFavoriteNumber);
        // 但是solidity print 出来的数字是一个hex，即0x00...，javascript很难处理这种数字，所以用toString()来让其以string格式显示
        // 然后让其这样：
        // 反引号用option + ~。这和c语言的（"%s", string）是一个意思
    console.log(`The current favorite number: ${currentFavoriteNumber.toString()}`);

    // 现在，调用.store()函数更新favoriteNumber变量，
    // 注意response记录txn相关信息（gas nonce），receipt记录对手方信息（sender，to）
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);

    // 查看更新后的 favoriteNumber变量
    const updatedCurrentFavoriteNumber = await contract.retrieve();
    console.log(`The updated current favorite number: ${updatedCurrentFavoriteNumber.toString()}`);


    

}


// 当 main 是一个 async函数，其return的结果需分成.
        // .then(process正常运行返回0) 
        // .catch(process报错退出返回1)
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })



