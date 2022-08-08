// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract MyNFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint internal lengthofSTP = 0; // declaring the length of all save the planet nft

    constructor() ERC721("SaveThePlanetNFT", "STPNFT") {}

// declaring the struct for all save the planet nft
    struct SaveThePlanet {
        uint tokenId;
        address payable owner;
       
    }

    mapping (uint => SaveThePlanet) internal savetheplanet;// mapping every save the planet nft to an index and passing it to a list


// minting save the planet nft
     
    function mint(string memory uri) public payable {
        uint256 tokenId = _tokenIdCounter.current();
        address cOwner = owner(); 
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        payable(cOwner).transfer(msg.value); // tranferring the celo ammount for minting multiple savetheplanet nft.
        listNFT(tokenId);// listing the nft 
    }

// a private function to list an nft. this is done automatically when minting the nft
    function listNFT(uint256 _tokenId ) private{
        savetheplanet[lengthofSTP] = SaveThePlanet(
            _tokenId,
            payable(msg.sender)
        );
        lengthofSTP++;
         _transfer(msg.sender, address(this), _tokenId);
    }


// getting save the planet nfts
    function getSavetheplanetNFTS(uint _index) public view returns(SaveThePlanet memory){
        return savetheplanet[_index]; 
    }

// removing a save the planet nft from the list
    function removeNFT(uint _index) external {
	        require(msg.sender == savetheplanet[_index].owner, "can't remove this nft");         
            savetheplanet[_index] = savetheplanet[lengthofSTP - 1];
            delete savetheplanet[lengthofSTP - 1];
            lengthofSTP--; 
	 }
// getting the length of save the planet nfts in the list
     function getNFTlength() public view returns (uint256) {
        return lengthofSTP;
    }


   
// batch minting nfts to multiple addresses. this function is just an extra functionality in the contract for future purposes
    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner payable
    {
        address cOwner = owner();
        payable(cOwner).transfer(msg.value); // tranferring the 1 celo fee for minting a savethe planet nft
        mintBatch(to, ids, amounts, data);
    }



  function numberofNFTMinted() public view returns(uint256) {
    uint256 totalNumberOfTokensMinted = totalSupply();
    return totalNumberOfTokensMinted;
  }


    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    //    destroy an NFT
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    //    return IPFS url of NFT metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}