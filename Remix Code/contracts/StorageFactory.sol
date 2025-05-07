// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;     // 一个package下的不同.sol文件需要拥有 相同 的solodoty版本号

// Script 2


// 大致思路

    // 创建一个array来储存不同的simpleStorage objects，同时写：
    // 函数1:在这个array中add simpleStorage objects
    // 函数2:在这个array中为simpleStorage object 来 store 这个 simpleStorage 的 favoriteNumber
    // 函数3:查看此array中的各个object的favoriteNumber是多少

// import "SimpleStorage.sol"这个contract
import "./SimpleStorage.sol";

contract StorageFactory{

    // 创建一个array来储存不同的simpleStorage objects
    SimpleStorage[] public simpleStorageArray;

    // 函数1:在这个array中add simpleStorage objects
    function createSimpleStorage() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    } 

    /*
    @param _simpleStorageIndex 需要store favoriteNumber 的 simpleStorage 在array中的index
    @param _simpleStorageFavoriteNumber 此simpleStorage 的 favoriteNumber
    @return void
    */
    function storeFavoriteNumber(uint256 _simpleStorageIndex, uint256 _simpleStorageFavoriteNumber) public{
        SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        simpleStorage.store(_simpleStorageFavoriteNumber);
    }

    /*
    @param _simpleStorageIndex 需要查看 此simpleStorage 的 favoriteNumber 是多少
    @return 此simpleStorage 的 favoriteNumber
    */
    function getFavoriteNumber(uint256 _simpleStorageIndex) public view returns(uint256){
        SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
        return simpleStorage.retrieve();

        //为了省gas，也可写成：
        // return simpleStorageArray[_simpleStorageIndex].retrieve();
    }



}
