// Script 5

const { developmentChains, Decimals, INITIAL_ANSWER } = require("../helper-hardhat-config");

module.exports = async({getAccounts, deployments})=> {
    const{deploy, log} = deployments;
    const{deployer} = await getNamedAccounts();

    if (developmentChains.includes(network.name)){
        log("This is a local network without a price feed, deploying mocks...");
        await deploy("MockV3Aggregator", {  contract: "MockV3Aggregator", 
                                            from: deployer, 
                                            log: true, 
                                            args: [Decimals, INITIAL_ANSWER]
                                        }
                    )
        }
    
    log("Mocks deployed! That means you now have valid priceFeed smart contract address on local networks");
    log("----------------------------------------------------");

}

module.exports.tags = ["all", "mocks"]; 
// yarn hardhat deploy -- tags mocks 意思是指运行.js文件中 module.exports.tags 有 mocks 的 js文件
// 这里的00-deploy-mocks.js的tags是["all", "mocks"]，
// 所以以下命令都会运行这个脚本：
// yarn hardhat deploy --tags mocks
// yarn hardhat deploy --tags all