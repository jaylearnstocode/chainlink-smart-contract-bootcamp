// Script 3

// 原本调用脚本部署合约的过程：
    // import
    // main
    // calling of main function

// 现在：

// 1. main
    // function deployFunc() {
    //     hre.getNamedAccounts()  // 获取命名账户
    //     hre.deployments  // 获取部署函数
    // }

// 2. 通过 module.exports 让 hardhat-deploy 识别到这个脚本
    // module.exports.default = deployFunc;

// 用法：
    // yarn hardhat compile (这个和此脚本没有任何关系)
    // yarn hardhat deploy --network sepolia (这个脚本真正作用的是这个命令)

const {networkConfig, developmentChains} = require("../helper-hardhat-config");

// 架构就是上面这个架构，但是按照hardhat官方文件，脚本一般都写成匿名函数：
module.exports = async (hre) => {   // 每次run hardhat deploy的时候，都会传入一个hre的参数

    // 从hre中获取要部署合约的账户地址，以及要部署的合约
    const { getNamedAccounts, deployments } = hre;  // 通过解构赋值获取到hre对象中的getNamedAccounts和deployments两个属性
    
    // 获取deployer的地址
    const { deployer } = await getNamedAccounts();  // 获取命名账户中的deployer账户

    // 从要部署的合约中提取deploy的属性和log属性
    const { deploy, log} = deployments;  // 通过解构赋值获取到deployments对象中的deploy和log两个属性
    
    // 获取当前网络的chainId
    const chainId = hre.network.config.chainId;  // 获取当前网络的chainId

        // 为了更进阶，现在我们不hard code 预言机地址了，而是新加一个helper-hardhat-config.js文件
        // 用if chain1 then chain1的预言机，if chain2 then chain2的预言机 的方式来规范。这对多链defi协议很重要
    // const address = 0x694AA1769357215DE4FAC081bf1f309aDC325306; //priceFeedAddress - Sepolia上的eth/usd预言机地址
        // 这种方式就是现在helper-hardhat-config.js中列举所有链的ethusd priceFeed 地址，
        // 这样y arn hardhat deploy --network 会根据network自动判断chainId，使用那个链的预言机
    
    let ethUsePriceFeedAddress; // initialize 变量，但暂时不给data type
    if (developmentChains.includes(network.name)) { // 如果当前网络是local network
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]; // 通过chainId获取ethUsdPriceFeed的地址
    }    


    // 如果当前网络的chainId是31337（即hardhat network），则使用MockV3Aggregator合约
    // 否则使用priceFeedAddress（即真实的价格预言机合约地址）

    // 这里是整个deploy脚本的重点 - 实例化一个fundMe智能合约，参数是priceFeed的地址（可以回去看FundMe.sol的构造函数)
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // constructor arguments, which is the priceFeed address
        log: true,
    })
    log("-----------------------------------------------------");
}

module.exports.tags = ["all", "fundme"]; 
// yarn hardhat deploy -- tags fundme 意思是指运行.js文件中 module.exports.tags 有 fundme 的 js文件
// 这里的01-deploy-fundMe.js的tags是["all", "fundme"]，
// 所以以下命令都会运行这个脚本：
// yarn hardhat deploy --tags fundme
// yarn hardhat deploy --tags all
