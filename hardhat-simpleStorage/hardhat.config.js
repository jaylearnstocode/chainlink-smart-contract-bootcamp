require("@nomicfoundation/hardhat-toolbox");

// 6 按照hardhat-verify官网要求来安装包
require("@nomicfoundation/hardhat-verify");


// 2 为了用process.env.Seqolia_RPC_URL，要导入包进来
require("dotenv").config();

// referred from Script 15, include 需要的tool，随后可以通过 yarn hardhat 看到这些tools
require("./tasks/block-number");
require("./tasks/accounts");


const Sepolia_RPC_URL = process.env.Sepolia_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat", // 1 默认的区块链就是 hardhat network 区块链，但是方便我们后续build，我们把它放在defaultNetwork里
  
  networks: {
    sepolia: {
      url: Sepolia_RPC_URL, // 3 加入我们想要的测试网
      accounts: [PRIVATE_KEY], // 4 加入我们的真实Sepolia私钥
      chainId: 11155111,       // 5 加入Sepolia的chainID，每个EVM链都有个单独的chainID
    }
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY   // 6 加入etherscan api用于自动验证我们部署上去的合约
  },
  
  solidity: "0.8.8"
};
