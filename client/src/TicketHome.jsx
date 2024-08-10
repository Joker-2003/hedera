import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";
import { useContext } from "react";
import { GlobalAppContext } from "./contexts/GlobalAppContext";
import { mainNftTranferWrapper, sendHbarToUser , sentHbarToTreasury, transferTicketNFT} from './services/hederaService'
import NavBar from "./components/Navbar";


export default function Home() {
  const { metamaskAccountAddress } = useContext(GlobalAppContext);

  // If we weren't able to grab it, we should throw a new error
  if (!process.env.REACT_APP_MY_ACCOUNT_ID || !process.env.REACT_APP_MY_PRIVATE_KEY) {
    throw new Error("Environment variables REACT_APP_MY_ACCOUNT_ID and REACT_APP_MY_PRIVATE_KEY must be present");
  }

  const event = {
    eventId: "0.0.4666386",
    ticketsSold: 2
  }

  // create your client
  const myAccountId = AccountId.fromString(process.env.REACT_APP_MY_ACCOUNT_ID);
  const myPrivateKey = PrivateKey.fromString(process.env.REACT_APP_MY_PRIVATE_KEY);
  const myAccountEvm = process.env.REACT_APP_MY_ACCOUNT_EVM_ID;

  const client = Client.forTestnet();
  client.setOperator(myAccountId, myPrivateKey);

  return (
    <>
    <h1>Home</h1>
      <NavBar/>
      <button
        onClick={() => {
          sendHbarToUser(client, myAccountId, metamaskAccountAddress, 7, myPrivateKey)
        }}
      >
        Transfer HBAR to MetaMask Account
      </button>
      <br></br>
      <button onClick={() => {
        sentHbarToTreasury(myAccountEvm, 7)
      }
      }>
        Transfer HBAR to Treasury
      </button>
      <button onClick={() => {
        mainNftTranferWrapper(myAccountId, metamaskAccountAddress, event, client)
      }
      }>
        Transfer NFT Ticket
      </button>
    </>
  )
}