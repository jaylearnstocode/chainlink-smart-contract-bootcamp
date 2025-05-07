// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// Script 4

// 本章学习目标

    // 写一个智能合约，包含：
    // 函数1:“把钱打进合”
    // 函数2:“把钱取出合约”

// 知识点

    // 在左边的“Deploy and run transactions"子页面的attributes都是global variables
    // 比如 environment, account, gas limit, value, contract
    // 我们可以用msg来access这些global variables
    // 比如 msg.value 来access value

contract FundMe1{

    uint256 public number;

    // 函数1:“把钱打进合”
    // payable 关键字 意味着这个函数涉及到钱的变动，这些在deployed contract的地方会显示为红色按钮
    // 
    function fund() public payable {

        number = 5;
        // require(要达到的条件，没达到的话的报错)
        // require()函数有点像 assert(真的statement， 否则报错)
        require (msg.value > 1e18, "Did not send enough Eth, now reverted."); 
        // 1e18 = 1 * 10^18 = 1,000,000,000,000,000,000 Wei = 1 Eth

        //此时运行函数，在左边的窗口可以设置你运行此函数时支付的 Value，也就是以太坊
        //比如你设置2eth，那么number就会被顺利的定义为5
        //如果你设置0.5eth，它就会报错“did not send enough eth”，退回gas fee，回滚number为not initialized
        
    }

    
}