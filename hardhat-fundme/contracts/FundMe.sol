// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// 本章学习目标

    // 写一个智能合约，包含：
    // 函数1:“把钱打进合”
    // 函数2:“把钱取出合约”

    // 调用library
    // 省 gas
        // 省 gas 方法1: 用constant字段
        // 省 gas 方法2: 用immutable字段
        // 省 gas 方法1: 用constant字段


// 知识点

    // 在左边的“Deploy and run transactions"子页面的attributes都是global variables
    // 比如 environment, account, gas limit, value, contract
    // 我们可以用msg来access这些global variables
    // 比如 msg.value 来access value

    // fund函数 只需在函数签名加 payable 关键字
    // withdraw函数 要在关键代码位置加 payable 关键字

// 如何使用

    // 部署
    // 在value处填写要send的 eth value，然后点合约的fund，然后在explorer上可以看到已经往合约里打了钱

// 这个script需要用到library，所以import library PriceConverter
import "./PriceConverter.sol";

// 省gas的方法3。用这个代替require（）
error NotOwner();

contract FundMe2{

    // 这是solidity中一个特别的函数：所有uint256的variable可以直接调用 PriceCoverter库 中的函数
    // 比如msg.value.getConversionRate(),编译器会把msg.value作为参数传入getConversionRate()的（）中
    // 因为msg.value是 uint256
    using PriceConverter for uint256;

    // 因为solidity中value的单位都是wei，所以所有币的币价都是 x * 10^18
    // 比如1 eth = 1 * 10 ** 18; 
    //      usd = 50 * 10 ** 18

    uint256 public constant MINIMUMUSD = 2 * 1e18; 
    // 为什么是1e18?
            // 因为solidity的数字运算都是本身的数字+18位数，所以任何数字后面都要乘10^18来匹配
            // 乘10^18之后的数字并未改变，只是补足了18个0，这些0都是小数点后的数

    // constant 
            // 使用前 transaction cost: 26250
            // 使用后 transaction cost: save a lot

            // 用在只需要计算，不会改变的值，这些值加上constant字段后，储存在字节码中，而不是类似堆栈中
            // constant 字段的 variable 要大写

    address[] funders;
    mapping(address => uint256) public addressAndFundsent;


    address public immutable owner;
    // immutable字段
            // 相当于 java 中的 final，solidity 的 constructo构造的一个object都可以用这个 immutable 关键字省 gas


    // 这个智能合约实际上就是个class，也拥有自己的constructor。然后运行时创建一个object，
    // 每个人用自己的object.fun(), object.withdraw()
    constructor(){
        owner = msg.sender;
    }


    // 函数1:“把钱打进合”
    // payable 关键字 意味着这个函数涉及到钱的变动，这些在deployed contract的地方会显示为红色按钮
    // 
    function fund() public payable {

        // require(要达到的条件，没达到的话的报错)
        // require()函数有点像 assert(真的statement， 否则报错)
        // require (getConversionRate(msg.value) >= minimumUsd, "Did not send enough Eth, now reverted."); 
        // 1e18 = 1 * 10^18 = 1,000,000,000,000,000,000 Wei = 1 Eth

        // 使用 PriceConverter 库 后的新函数：msg.value.getConversionRate()
        require (msg.value.getConversionRate() >= MINIMUMUSD, "Did not send enough Eth, now reverted."); 
        
        // 把打款人计入data structures中
        funders.push(msg.sender);
        addressAndFundsent[msg.sender] = msg.value;
    }

    function withdraw() public onlyOwner{

        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            addressAndFundsent[funder] = 0;
        }
        funders = new address[](0); // 每一个index上都存成0。注意是() 不是 []

        /*
        // 打款函数1: .transfer
        // 特点：打不成功，state完全回滚。打不成功的唯一原因：gas fee < 2300 wei
        payable(msg.sender).transfer(address(this).balance);
        // payable() - 把msg.sender包起来，是一个付款函数必须的修饰符

        // 打款函数2: .send
        // 特点：打不成功，state不会回滚，除非自己再写一个require()函数来回滚失败交易的state
        // 需要一个sendSuccess来接住函数运行完后返回的布尔值
        bool sendSuccess = payable(msg.sender).send(address(this).balance);
        require(sendSuccess, "Send failed. ")
        */

        // 打款函数3: .call （最推荐使用）
        // 特点：最底层的用法，后面的（“”）可以写需要回调的函数
        // (bool callSuccess, bytes memory dataReturned) = payable(msg.sender).call{value: address(this).balance}("");
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        // require(callSuccess, "Call failed. ");
        if (!callSuccess){
            revert NotOwner();      // 省gas 方法3，用if（）{NotOwner()} 代替 require()
        }
    }

    // solidity的特点：可以自定义modifier，这个modifier最终用到了withdraw上
    // 只有owner == msg.sender，函数才会运行，负责退出。
    modifier onlyOwner(){
        require(owner == msg.sender, "Sender is not owner. ");
        _;  
        // _;在下意味着先判断require再运行函数本地
        // _;在上意味着先运行函数本地再判断require
        // 一般都在下

    }

    // 当有人直接通过send向本智能合约打款，调用fund(), fund()会判断钱给的够不够多,也会将此funder存入数据结构
    receive() external payable { 
        fund();
    }

    // 当有人自定义calldata但是填错函数信息的时候，也调用fund()
    fallback() external payable { 
        fund();
    }

    

}
