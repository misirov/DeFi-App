//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract DAI is ERC20 {


    constructor() ERC20('Dai Token', 'DAI'){
        _mint(msg.sender, 1_000_000);
    }


}