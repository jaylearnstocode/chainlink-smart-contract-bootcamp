// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

// Script 3

// 不要忘了要加"./"
import "./StorageFactory.sol"; 

// 继承关键字“is”，现在ExtraStorage智能合约 继承了 SimpleStorage智能合约
//继承需要做3件事
    // 在contract这里加上“is”关键字
    // 在需要被override的函数原处的public后面加上 ”virtual“ 关键字
    // 在overrided的函数的public后面加上 ”override“ 关键字
contract ExtraStorage is SimpleStorage{

    // 这里加了 override
    function store(uint256 _favoriteNumber) public override {
        favoriteNumber = _favoriteNumber + 10;
    }

}



