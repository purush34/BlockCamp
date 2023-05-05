// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lock {
    struct Event {
       address organizer;
       string name;
       uint start_date;
       uint end_date;
       string location;
     }

    mapping(uint => Event) public events;
    uint public nextId;

    constructor() {
        nextId = 0;
    }

    function createEvent(string memory name, uint start_date, uint end_date, string memory location) external {
        require(start_date > block.timestamp, "You can only create events for future dates");

        events[nextId] = Event(msg.sender, name, start_date, end_date, location);
        nextId++;

        // specify a gas limit higher than the estimated gas limit
        uint gasLimit = 2000000;
        bytes memory data = abi.encodeWithSignature("createEvent(string,uint256,uint256,string)", name, start_date, end_date, location);
        (bool success, ) = msg.sender.call{gas: gasLimit}(data);
        require(success, "Failed to execute contract");
    }

    function getEvents() external view returns (Event[] memory) {
        Event[] memory eventList = new Event[](nextId);
        for (uint i = 0; i < nextId; i++) {
            eventList[i] = events[i];
        }
        return eventList;
    }
}
