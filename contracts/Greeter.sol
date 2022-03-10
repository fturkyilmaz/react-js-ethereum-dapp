//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);

        greeting = _greeting;
    }

    uint256 public count = 0; // state variable

    struct Drink {
        uint256 id;
        string qrCode;
    }

    mapping(uint256 => Drink) public drinks;

    function greet() public view returns (string memory) {
        console.log("Greeting from '%s' to '%s'", greeting, greeting);
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function createDrink(string memory _qrCode) public returns (Drink memory) {
        console.log("Yeni datayi ekle !!!");

        count++;

        console.log("createDrink, ! Name : %s  Count : %s", _qrCode, count);

        drinks[count] = Drink(count, _qrCode);

        return drinks[count];
    }

    function createDrinkIfExist(string memory _qrCode)
        public
        returns (bool, Drink memory)
    {
        if (count != 0) {
            for (uint256 i; i <= count; i++) {
                Drink memory item = drinks[i];

                console.log("Ayni datayi ekleme !!!");

                if (
                    keccak256(bytes(item.qrCode)) == keccak256(bytes(_qrCode))
                ) {
                    return (true, item);
                }
            }
        }

        console.log("Yeni datayi ekle !!!");

        count++;

        console.log("createDrink, ! Name : %s  Count : %s", _qrCode, count);

        drinks[count] = Drink(count, _qrCode);

        return (false, drinks[count]);
    }

    function getDrinkCount() public view returns (uint256) {
        return count;
    }

    function get(uint256 _itemIndex) public view returns (Drink memory) {
        Drink memory item = drinks[_itemIndex];

        return item;
    }

    function getDrinks() public view returns (Drink[] memory) {
        uint256 currentIndex = 0;

        Drink[] memory items = new Drink[](count);

        for (uint256 i = 0; i < count; i++) {
            Drink storage member = drinks[i + 1];

            items[currentIndex] = member;

            currentIndex += 1;
        }

        return items;
    }
}
