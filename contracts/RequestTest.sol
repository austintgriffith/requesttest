pragma solidity ^0.4.11;

contract mortal {
    address owner;
    function mortal() { owner = msg.sender; }
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}


contract RequestTest is mortal {

    event RequestMade(bytes32 _request);
    event ResponseMade(bytes32 _response);

    bytes32 public request;
    bytes32 public response;

    function Request(bytes32 _request){
        request=_request;
        RequestMade(_request);
    }

    function Response(bytes32 _response){
        response=_response;
        ResponseMade(_response);
    }

}
