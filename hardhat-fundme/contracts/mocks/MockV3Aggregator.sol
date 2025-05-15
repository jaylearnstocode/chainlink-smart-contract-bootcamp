// Script 6

// SPDX-License-Identifier: MIT

// 首先这个 mockV3Aggregator.sol 是一个mock的合约, 目的是假如我们要部署合约到一个没有预言机的链（比如hardhat network)也能顺利部署
// 这个mock合约本质是当在没有预言机的链上deploy时，这个智能合约自动监测，如果没有，就自动部署一个priceFeed智能合约，供我本身的智能合约使用，
// 以此达到 无论这个链有无预言机都能返回一个eth/usd的价格 的目的

pragma solidity ^0.8.0;

// 这样就把这个mock合约的代码引入进来了（因为chainlink的github有所以直接用，不用写），用import和复制粘贴代码进来是一样的
import "@chainlink/contracts/src/v0.8/shared/mocks/MockV3Aggregator.sol";

