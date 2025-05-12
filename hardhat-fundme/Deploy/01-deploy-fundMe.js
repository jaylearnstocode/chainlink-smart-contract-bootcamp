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


// 架构就是上面这个架构，但是按照hardhat官方文件，脚本一般都写成匿名函数：
module.exports = async (hre) => {   // 每次run hardhat deploy的时候，都会传入一个hre的参数

    // 从hre中获取要部署合约的账户地址，以及要部署的合约
    const { getNamedAccounts, deployments } = hre;  // 通过解构赋值获取到hre对象中的getNamedAccounts和deployments两个属性
    
      // 获取deployer的地址
      const { deployer } = await getNamedAccounts();  // 获取命名账户中的deployer账户

    // 从要部署的合约中提取deploy的属性和log属性
    const { deploy, log } = deployments;  // 通过解构赋值获取到deployments对象中的deploy和log两个属性
    
    // 获取当前网络的chainId
    const chainId = hre.network.config.chainId;  // 获取当前网络的chainId
}
