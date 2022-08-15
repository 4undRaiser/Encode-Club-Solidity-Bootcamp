import React from "react";
import {Notification} from "./components/ui/Notifications";
import Wallet from "./components/wallet";
import { Contract, ethers } from "ethers";

import Nfts from "./components/minter/nfts";
import MyNFT from '../contracts/MyNFT.json';
import MyNFTContractAddress from '../contracts/MyNFT-address.json';



import "./App.css";


import {Container, Nav} from "react-bootstrap";


const App = function AppWrapper() {


    const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY);
  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("Rinkeby");
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
    
    // initialize the NFT mint contract
    const minterContract = new Contract(
        MyNFTContractAddress,
        MyNFT.abi,
        signer
      );
   

    return (
        <>
            <Notification/>
                <Container fluid="md">
                    <Nav className="justify-content-end pt-3 pb-5">
                        <Nav.Item>

                            {/*display user wallet*/}
                            <Wallet
                                address={signer}
                                amount={balance}
                                symbol="ETH"
                            />
                        </Nav.Item>
                    </Nav>
                    <main>

                        {/*list NFTs*/}
                        <Nfts
                            name="my NFT Collection"
                            updateBalance={signer.getBalance()}
                            minterContract={minterContract}
                        />
                    </main>
                </Container>
          
        </>
    );
};

export default App;
