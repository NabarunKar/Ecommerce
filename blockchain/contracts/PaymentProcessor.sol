pragma solidity 0.8.19;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
  address public admin; // merchant address
  IERC20 public dai;    // pointer to DAI smart contract

  event PaymentDone(
    address payer,
    uint amount,
    uint paymentId,
    uint date
  );

  constructor(address adminAddress, address daiAddress) public {
    admin = adminAddress;
    dai = IERC20(daiAddress);   
  }

  function pay(uint amount, uint paymentId) external {
    dai.transferFrom(msg.sender, admin, amount);
    emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
  }
}