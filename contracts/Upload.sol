// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => Access[]) accessList;
    mapping(address => string[]) urlInfo;
    mapping(address => mapping(address => bool)) previousData;
    mapping(address => mapping(address => bool)) ownership;

    function addUrl(address _userId, string calldata _url) external {
        urlInfo[_userId].push(_url);
    }

    function allowAccess(address _userId) external {
        ownership[msg.sender][_userId] = true;
        if (previousData[msg.sender][_userId] == true) {
            for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == _userId) {
                    accessList[msg.sender][i].access == true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(_userId, true));
            previousData[msg.sender][_userId] = true;
        }
    }

    function disallowAccess(address _userId) external {
        ownership[msg.sender][_userId] = false;
        for (uint256 i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == _userId) {
                accessList[msg.sender][i].access == false;
            }
        }
    }

    function display(address _userId) external view returns (string[] memory) {
        require(
            _userId == msg.sender || ownership[_userId][msg.sender],
            "You don't have access"
        );
        return urlInfo[_userId];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
