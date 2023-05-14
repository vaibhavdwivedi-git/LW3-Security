//SPDX-License-Identifier:MIT

contract Good {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setOwner(address newOwner) public {
        require(tx.origin == owner, "Not Owner");
        owner = newOwner;
    }
}
