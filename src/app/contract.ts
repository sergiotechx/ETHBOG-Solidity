import { getContract } from "thirdweb";
import { client } from "./client";
import {arbitrumSepolia } from "thirdweb/chains";



export const assignContract = (_contract: string) => {

  const contract = getContract({
    // the client you have created via `createThirdwebClient()`
    client,
    // the chain the contract is deployed on
    chain: arbitrumSepolia,
    // usdc
    address: _contract,

  });
  return contract; 
}



