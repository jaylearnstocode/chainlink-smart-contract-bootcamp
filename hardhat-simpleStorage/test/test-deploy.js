// Script 17 - 测试

// Hardhat里面对solidity智能合约的测试用的是 mochajs, 这是一个测试框架，类似junit test

// 测试文件既可以用纯solidity语言写，也可以用js写，主流的写法是用js写

// 使用方法：

  // 先写 test
  // yarn hardhat test 来测试
  //
  // yarn hardhat test --grep Test1 这个命令可以只运行test1
  // 或者在it()这里加it.only()来让程序只test这里的it()

// 测试的标准逻辑是这样：

  /*

  // function test(){
  //   beforeEach(); // 测试前的初始化
  //   it(); // 测试1
  //   it(); // 测试2
  // }

  // 第一个参数是测试名称，第二个参数是需要测试的函数
  // describe("SimpleStorage", test);

  */

// 但是约定俗成的方法是不直接把function写出来，默认只使用匿名函数，以下为真正的测试文件:

const {ethers} = require("hardhat");

// 为了使用assert或expect关键字，引入node_modules中的 chai 包，chai包也是一个测试包
const {expect, assert} = require("chai");
// 注意：expect和assert关键字完全等价


describe("SimpleStorage", () => {
  let simpleStorageFactory;
  let simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");  // 把要部署的合约放入.getContractFactory()
    simpleStorage = await simpleStorageFactory.deploy();
  })

  it("Test1: initial favorite number, which should be 0.", async () => {
    const currentValue = await simpleStorage.retrieve();
    const expectedValue = "0";

    assert.equal(currentValue, expectedValue);
  })

  }
)
