// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Script 5

// 这是从chainLink的docs页面跳转进来的price feed demo

// 基本原理

    // import chainlink 的 智能合约
    // 实例化一个aggregator object，然后调用函数get各种汇率
    // 到 https://docs.chain.link/data-feeds/price-feeds/addresses?page=1 选择想要的汇率
    //   把想要的汇率的contract address 替换掉custructor中的合约地址，就可以获取了

// 使用方法

    // compile -> deploy -> 点 getChainlinkDataFeedLatestAnswer 获取 所需汇率

// bootcamp中的软广

    // 一个是如何使用chianlink
    // 一个是vrf随机函数，用来nft随机抽奖啥的
    // 一个是keepers，用来去中心化的监听不同事件的触发，比如价格跌到1000没，事件超过10天没，另一个合约是否被调用了
    // 一个是ChainLink API，用set get 和 post 去获取链下信息

import {AggregatorV3Interface} from "@chainlink/contracts@1.3.0/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED
 * VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/**
 * If you are reading data feeds on L2 networks, you must
 * check the latest answer from the L2 Sequencer Uptime
 * Feed to ensure that the data is accurate in the event
 * of an L2 sequencer outage. See the
 * https://docs.chain.link/data-feeds/l2-sequencer-feeds
 * page for details.
 */

contract DataConsumerV3 {
    AggregatorV3Interface internal dataFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }

    /**
     * Returns the latest answer.
     */
    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundId */,
            int256 answer,
            /*uint256 startedAt*/,
            /*uint256 updatedAt*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }
}