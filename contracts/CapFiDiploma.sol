pragma solidity ^0.4.17;

import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract CapFiDiploma is ERC721Token, Ownable {
  string public constant name = "CapFiDiploma";
  string public constant symbol = "CFD";

  struct Diploma {
    string firstName;
    string lastName;
  }

  Diploma[] public diplomas;

  function getDiploma( uint _diplomaId ) public view returns(string firstName, string lastName){
    Diploma memory _dipl = diplomas[_diplomaId];

    firstName = _dipl.firstName;
    lastName = _dipl.lastName;
  }

  function mint(string _firstname, string _lastname) public payable onlyOwner{
    Diploma memory _dipl = Diploma({ firstName: _firstname, lastName: _lastname});
    uint _diplomaId = diplomas.push(_dipl) - 1;

    _mint(msg.sender, _diplomaId);
  }
}
