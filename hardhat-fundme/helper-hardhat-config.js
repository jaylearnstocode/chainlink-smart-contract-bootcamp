// Script 4

const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306", // Sepolia上的eth/usd预言机地址
    },


    80002: {
        name: "Amoy",
        ethUsdPriceFeed: "0xF0d50568e3A7e8259E16663972b11910F89BD8e7",
    }

    // 31337: {
}

// hardhat network 和 localhost network 这两条链时local network，
// 需要在本身project的智能合约run之前，通过contracts/mocks/MockV3Aggregator.sol这个合约部署priceFeed，
// 所以在helper-hardhat-config.js中定义developmentChains
const developmentChains = ["hardhat", "localhost"]; 

const Decimals = 8; // 预言机的constructor需要的参数3：精度
const INITIAL_ANSWER = 200000000000; // 预言机的constructor需要的参数4：初始值，意思是2000.00000000，2000指的是eth的价格，后面8个0是精度
    
module.exports = {
    networkConfig,      // 00-Deploy-mocks中智能合约需要判断，如果不是local network，就用真实的eth/usd priceFeed地址
    developmentChains,  // 00-Deploy-mocks中智能合约需要判断，如果是local network，就用MockV3Aggregator合约
    Decimals,           // 00-Deploy-mocks中智能合约的constructor需要的参数1：精度
    INITIAL_ANSWER,     // 00-Deploy-mocks中智能合约的constructor需要的参数2：初始值，意思是2000.00000000，2000指的是eth的价格，后面8个0是精度
}

// 可以到https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/shared/mocks/MockV3Aggregator.sol
// 查看MockV3Aggregator.sol的constructor:

    /*
    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        updateAnswer(_initialAnswer);
    }
    */