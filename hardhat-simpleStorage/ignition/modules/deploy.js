// Script 14 - 在hardhat框架下写 部署合约的脚本


// 怎么run

    // yarn hardhat run ignition/modules/deploy.js

    // 如果想要指定想run的区块链：

        // 方法1:
        // yarn hardhat run ignition/modules/deploy.js --network hardhat    // 虽然默认就是hardhat
        
        // 方法2: 直接在 hardhat.config.js 中指定network
        // 首先创建.env，然后把.env放入.gitignore, 然后去alchemy上搜sepolia的rpc_url，
        // 然后放在.env文件中，然后把rpc_url输入hardhat.config.js的network中 
        // （需要在 hardhat.config.js 中导入 dotenv包, 并”yarn add dotenv“）


// hardhat框架好处

    // 在本地(比如hardhat Netowork)测试不需要自己配置私钥和prc_url
    // 部署智能合约不需要手动点metamask wallet的sign和send
    // 合约部署好后，可以通过代码让etherscan上的contract verified，而不需要自己手动复制粘贴

// 导入包
const {ethers} = require("hardhat");
// 这是解构赋值语法，表示你从 require("hardhat") 返回的对象中，只提取其中的 ethers 属性。
    
    // 例如，如果 require("hardhat") 返回的是这个对象：
    // {
    //     ethers: { ...someEthersStuff },
    //     network: { ... },
    //     config: { ... },
    //     ...etc
    //   }

//   你最终拿到的 ethers 只是这个对象的一个子部分。

// const ethers = require("hardhat");
// 这表示你把整个 hardhat 模块的导出对象都赋值给变量 ethers

// 这里是在hardhat框架中build，只提取hardhat包中的ethers包，所以用第一种


// async main
async function main(){
    // 将要部署的合约都存进 SimpleStorageFactory
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying contract...");

    // 部署所有合约，返回部署情况
    const simpleStorage = await SimpleStorageFactory.deploy();

    // 等待部署完全完成，部署情况返回才能进行下一步
    await simpleStorage.waitForDeployment();

    // 看看部署的智能合约的地址
    console.log(`Deployed contract to: ${await simpleStorage.getAddress()}`);

    // 如果没有制定rpc_url和private key，默认部署到hardhat network 区块链（就是一个ganache）

    // 如果要部署到Sepolia测试网，那么按上面的方法2配置 hardhat.config.js 即可
}

// 要写这个函数，需要用到hardhat的插件 - hardhat-verify
// （https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify）
// 然后跟着里面的使用指南走
// 1. npm install --save-dev @nomicfoundation/hardhat-verify
// 2. 到
async function verify(contractAddress, args){

}


// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
