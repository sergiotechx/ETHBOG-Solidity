// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
pragma solidity 0.8.20;

contract TokenDistributor {
    
    address private constant BOG_CONTRACT_ADDRESS =
        0xAbBC523E3eBdB0Ed328631B1cDFfEb70f1eAe0bC;
    IERC20 private bogToken;
    address public owner;
    uint256 public constant TOKENS_PER_REQUEST = 1000 * 10 ** 6;
    mapping(address => bool) public hasRequested;

    event TokensDistributed(address recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
    constructor() {
        owner = msg.sender;
        bogToken = IERC20(BOG_CONTRACT_ADDRESS);
    }

    function distributeTokens() public {
        require(
            !hasRequested[msg.sender],
            "You have already requested tokens."
        );
        require(
            bogToken.balanceOf(address(this)) >= TOKENS_PER_REQUEST,
            "Not enough tokens in the contract."
        );

        hasRequested[msg.sender] = true;
        bogToken.transfer(msg.sender, TOKENS_PER_REQUEST);
        emit TokensDistributed(msg.sender, TOKENS_PER_REQUEST);
    }

    // Function to withdraw remaining tokens (in case of need)
    function withdrawTokens(uint256 amount) public onlyOwner {
        bogToken.transfer(owner, amount);
    }
}
