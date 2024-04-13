//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.19;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RealEstate is ERC721URIStorage {
    uint256 private _nextTokenId;

    constructor() ERC721("RealEstate", "REAL") {}

    function mint(string memory tokenURI) public returns (uint256) {
        uint tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId;
    }
}
