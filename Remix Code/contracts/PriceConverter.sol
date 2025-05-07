// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// Script 7

// 这里学习创建一个library

    // library中的所有函数都必须是internal的

// 这是solidity的全新引用方法
// @符号会识别后面的内容是一个github repo，然后 npm（一个包管理器）会自动从github上下载这个repo的东西，并放在左边目录中.deps包中
// 然后就可以在这个script中调用其他的智能合约api了（solidity中称呼它们为abi）
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

library PriceConverter{
    // 从chainlink的智能合约获取当前eth/usd汇率
    // 任何调用外部函数都需要2个东西
        // ABI - 实际上就是外部库的interface
        // address - 每一个智能合约都有一个txn hash，也是它的智能合约 address
    function getPrice() internal view returns (uint256) {
        
        // 这是“AggregatorV3Interface.sol” interface 的construcor函数。注意，没有 new 关键字！
        // constructor函数的参数，是监控币价的智能合约地址
        // 智能合约地址在这看：https://docs.chain.link/data-feeds/price-feeds/addresses?page=1
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        
        // 现在我们调用.latestRoundData()这个api，return的结果是这样的：
            /*
            function latestRoundData()
                external
                view
                returns (uint80 roundId, int256 answer, uint256 startedAt, 
                        uint256 updatedAt, uint80 answeredInRound);
            */ 
        // 也就是说我们要有一个数组来接受roundID, answer, startedAt, updatedAt, answeredInROund
        // 然后只取我们需要的结果（也就是 eth/usd 的 price 变量）
        // (roundId, answer, startedAt, updatedAt, answeredInRound) = priceFeed.latestRoundData();
        (,int256 price,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);   // 要强制cast一下类型，从int256->uint256 
        // 为什么是1e10?
            // 因为chainlink的返回值只有8位，要乘10^10来匹配eth的18位数字。
            // 乘10^10之后的数字并未改变，只是补足了10个0，这些0都是小数点后的数
    }

    // 真正的转换函数，这里的eth
    function getConversionRate(uint256 ethAmount) internal view returns (uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    }
}


