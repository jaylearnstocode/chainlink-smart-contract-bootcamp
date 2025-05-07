// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// script 8

// 这里学习两个特殊函数

    // receive() external paybale, 用于用户直接在metamask点send，往本smart contract打钱的情况
    // 不管用户打0eth，还是0.001eth，只要是直接往合约里打钱（不通过正规函数），就通过receive() external paybale承接
    
    // 如何模拟：点Deployed contracts中的 transact

    // fallback() external payable, 用于用户自己输入calldata调用，但是calldata的信息不对应任何智能合约中的函数
    // 此时，就通过receive() external paybale承接

    // 如何模拟：在calldata中输0x00..., 然后点Deployed contracts中的 transact

contract FallbackExample{

    uint256 public result;


    receive() external payable {
        result = 1;
    }

    fallback() external payable {
        result = 2;
    }
}

