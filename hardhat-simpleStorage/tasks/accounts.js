// Script 15 在console中使用不同的工具
    // 首先创建一个folder - tasks
    // 然后为需要的task各自创建单独的js文件，比如这里创建的就是accounts.js

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


task("accounts", "Print the list of the accounts").setAction(async(taskArgs, hre) =>{
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts){
        console.log(account.address);
    }
})

module.exports = {}