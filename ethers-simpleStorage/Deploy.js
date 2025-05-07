// script 8

// 从 terminal 中 run的方法: node Deploy.js
// node 是 javascript 的 后端vm，所以和 python Deploy.py 一个道理，用 node 关键字

// 什么是异步函数: 等待 popcorn 和 drinks 完成后才运行startMovie：
    
    // async function setUpMovieNight(){
    //     await cookPopcorn();
    //     await pourDrinks();
    //     startMovie();
    // }

    // 真实用例：await deployContract(); 成功deployed后才执行其他函数

// 通过“yarn add solc”在终端 add 了 solc包（整个node_modules)，其中solc文件夹就是solidity编译器

    // 重新通过“yarn add solc@0.8.8-fixed" 安装 0.8.8 的 solodity编译器
    // yarn关键字既可以安装包，也可以运行程序：yarn add solc; yarn Deploy.js
    // yarn basically 用作安装外部包的关键字，功能类似 pip install xxx
    
    // yarn solcjs --bin --abi --include-path /node_modules --base-path . -o . simpleStorage.sol
        // solcjs: solidity编译器
        // --bin: 这里的bin不是桶，是binary，所以这里是 running binary code
        // --abi: we also want all abis aggregated
        // --include-path /node_modules: 所有code和abis所在的包
        // --base-path: 前面的这个包就是base path
        // . 代表文件叙述完成
        // -o 编译成obj文件，并且也存放在这个文件夹下
        // . 代表编译配置完成
        // simpleStorage.sol: 代表要编译的文件

        // 要运行此命令，先把simpleStorage.sol放到此文件夹下
        
        // 运行后得到 .abi 和 .bin 文件。
            // .abi文件的内容就和remix中abi中的内容一样
            // .bin文件的内容就和remix中binary中的内容一样

        // 但是这样每次要compile要输一大串太麻烦了。我们可以：
            // 在package.json中加入"scripts", 并定义关键字 “compile"。
            // 之后直接在terminal中写“yarn compile"就超方便可以编译文件
            // 这种在package.json文件中加入简介语句的功能类似C语言的makefile


// 让main函数变成 异步函数(asynchronous function)
async function main(){
    console.log("hi");
    let variable = '5';
    console.log(variable);
}

// Javascript 需要将函数单独列出来execute，如果没有以下这行代码，代码只会正常编译，不会print任何东西
// main();

// 当 main 是一个 async函数，其return的结果需分成.
        // .then(process正常运行返回0) 
        // .catch(process报错退出返回1)
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })


