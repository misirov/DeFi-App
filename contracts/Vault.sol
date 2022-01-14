//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./DAI.sol";
// import "./FARM.sol";


/**
    @notice Vault has a native FARM token which is minted and burned based on user DAI deposits / withdrawals

*/ 

contract Vault is ERC20 {

    // ERC20 Tokens to interact with
    IERC20 public dai;
    
    event Withdraw(address _addr, uint _amount);
    event Deposit(address _addr, uint _amount);

    address public _owner;

    constructor(address _addr) ERC20('Farm Token', 'FARM'){
        dai = IERC20(_addr);
        _owner = msg.sender;
    }



    function deposit(uint256 _amount) external {
        require(_amount > 0, "amount must be bigger than 0");
        dai.transferFrom(msg.sender, address(this), _amount);
        _mint(msg.sender, _amount);
        emit Deposit(msg.sender, _amount);


    }


    function withdraw(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "cannot withdraw more than what you have");
        _burn(msg.sender, _amount);
        dai.transferFrom(address(this), msg.sender, _amount);
        emit Withdraw(msg.sender, _amount);

    }


}