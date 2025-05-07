// Script 15 在console中使用不同的工具
    // 首先创建一个folder - tasks
    // 然后为需要的task各自创建单独的js文件，比如这里创建的就是block-number.js

// 如何使用console中的tool: yarn hardhat

// 根据https://hardhat.org/hardhat-runner/docs/advanced/create-task
// create task 的模版是这样的：

/*
    require("@nomicfoundation/hardhat-toolbox");

    task("balance", "Prints an account's balance").setAction(async () => {});

    /** @type import('hardhat/config').HardhatUserConfig //
    module.exports = {
        solidity: "0.8.28",
    };

*/

// 所以，我们也按照上面的模版，create一个“account”任务
require("@nomicfoundation/hardhat-toolbox");


// 知识点：

    // 1
    // function char getABC(int a, int b){return result};
    // char aVariable = getABC(a,b);

    // 2
//   char aVariable = (a,b) => {return result};

// 1和2是完全等价的，第2种就是所谓的箭头函数，也叫无名氏函数

// taskArgs - task需要的参数，这里不需要任何参数，所以无所谓
// hre - hardhat runtime environment, 可以把 hre 理解成 hardhat包 as a whole
task("block-number", "Print the current block number").setAction(async(taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`Current block number: ${blockNumber}`);

})

module.exports = {}

// 写完这个task后，要回到hardhat.config.js中用 require("./tasks/block-number") 来 include 这个 task，才会在toolbar上显示




