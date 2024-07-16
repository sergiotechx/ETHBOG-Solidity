'use client';
import Image from "next/image";
import { ConnectButton, useActiveWalletConnectionStatus, useSendTransaction, useActiveAccount } from "thirdweb/react";
import { readContract } from "thirdweb";
import { client } from "./client";
import { Button } from 'primereact/button';
import './style.css';
import { assignContract } from "./contract";
import { prepareContractCall, PreparedTransaction, } from "thirdweb";
import { useEffect } from "react";
import { stringToHex } from 'viem'
import Swal from "sweetalert2";


const distibutionContract: string = '0x658cC355585590b4db1c2c96f28813c0E72f7a8c';

export default function Home() {
  const walletStatus = useActiveWalletConnectionStatus();

  const activeAccount = useActiveAccount();

  let { mutate: sendTx, data: transactionReceipt, isPending } = useSendTransaction();


  useEffect(() => {
    console.log('transactionReceipt', transactionReceipt)
    if(transactionReceipt){
       let message = `Transaction hash: ${transactionReceipt.transactionHash}`; 
       Swal.fire({
        title: 'Successful',
        text: message,
        icon: 'success',
        confirmButtonText: 'continue'
      })
    }

  }, [transactionReceipt])


  async function getTokens() {
    if (walletStatus == 'connected') {
      const contract = assignContract(distibutionContract)
      if (contract) {
        const delivered: boolean = await readContract({
          contract,
          method: "function hasRequested(address) view returns (bool)",
          params: [activeAccount?.address as string]
        })
        console.log('delivered',delivered);
        if (delivered) {
          Swal.fire({
            title: 'Error!',
            text: 'You have received the tokens before',
            icon: 'warning',
            confirmButtonText: 'continue'
          })
        }
        else {
          const transaction = prepareContractCall({
            contract,
            method: "function distributeTokens()",
            params: [],
          });
          sendTx(transaction as PreparedTransaction);
        }
      }


    }

  }
 
  return (
    <main>
      <div >
        <ConnectButton
          client={client}
          appMetadata={{
            name: "Curso eth BOG",
            url: "https://example.com",
          }}
        />
      </div>
      <div className="Content">
        <h1>Proceed to get your BOG tokens, remember, you can only get your tokens one time</h1>
        <h2>BOG contract: 0xAbBC523E3eBdB0Ed328631B1cDFfEb70f1eAe0bC</h2>
        <Button label="Proceed" onClick={getTokens} />
       
      </div>
    </main>

  );
}