// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Script 1

contract SimpleStorage{
    
    // 怎么 run
        
        // compile -> deploy -> 到deployed contracts中操作
        // smart contract本质上就是一个写在block的data中的数据，
        //  而data中的数据就是一个一个交易，所以其实智能合约就是一个交易
        //  因此，智能合约这个交易需要付gas fee来部署，同时也有个交易的hash，即智能合约地址

    // 正式开始

        // 带下划线的是参数，不能是全局变量
        // internal是private，public就是public，如果不在一开始标明，默认是internal
        // public标识符在中间，不在最开始

        // 消耗的gas主要看“transaction cost”这一栏的gas
        // Deploy左边菜单栏的Deployed contracts中的变量0, 1, 就是看code中的位置。比如favoriteNumber在[0], people在[1]
        // Deploy左边菜单栏的Deployed contract中会显示所有public的variables和函数


    // uint256 internal favoriteNumber;
    uint256 public favoriteNumber;
    
    // array, struct, mapping是solidity中的三大特殊数据结构

    // array
    People[] public people; //solidity中的array是dynamic的，不用一开始固定长度
    
    // struct
    struct People{
        uint256 favoriteNumber;
        string name;
    }

    // mapping （就是hashmap数据结构）
    mapping(string => uint256) public nameToFavoriteNumber; // key是string类型，value是uint256类型

    //只规定了public
    function store(uint256 _favoriteNumber) public virtual {    // 这里为了 ExtraStorage.sol 的继承加上了 virtual 关键字
        favoriteNumber = _favoriteNumber;
        favoriteNumber = favoriteNumber + 1;  
    }

    //规定了public，还规定了return value data type：unit256. 语句：view returns(unit256)
    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    // view 和 pure 不消耗 gas
        // view returns() 是只读函数，只能return local variables，不能modify。相当于getter()
        // pure return() 是不可读不可modify函数，常用于把常使用且冗长的计算算法写进来，然后在其他函数中调用

        // view 和 pure 不消耗gas，但是一个需要消耗gas的函数中调用view 和 pure 需要消耗 gas

    // pure函数例子
    function pureFunctionExample() public pure returns(uint256){
        return (4+5); 
    }

    // 所有非数字的函数param都需要决定是临时的local variables，还是存在区块链上（相当于global variables)
    // calldata 用于生命传入函数的参数不可被改变。如在函数中写 _name = "new name jayyy";会报错
    // memory 用于声明函数内部的临时变量，这些变量在函数执行完后会被销毁。
    // storage 用于声明合约的持久状态变量，这些变量存储在区块链上，直到被显式修改。（上链后依然可修改）

    // 注意，在 “function addPerson(string memory _name, uint256 _favoriteNumber)”  里，只能是 memory 或 calldata
    // 因为( )中的都是参数，是不可能被存在哪的，只能在栈上，所以只能 memory 或 calldata 二选一，绝对不可能是 storage
    // 但是函数内部的 “People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});” 可以是storage
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        people.push(newPerson);                        // 将新的people object add 进 array
        nameToFavoriteNumber[_name] = _favoriteNumber; // 将_name: _favoriteNumber add 进 hashmap
    }

}