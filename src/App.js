import "./App.css";
import "./index.css";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const CONTRACT_ADDRESS = "";

function App() {
  const [userAddress, setUserAddress] = useState("");

  const [form, setForm] = useState({
    value: "1",
    message: "Furkan Türkyılmazdan herkese selamlar",
  });

  const onChangeText = (key, text) => {
    setForm({ ...form, [key]: text });
  };

  async function fetchGreeting() {
    try {
      // const contract = new ethers.Contract(
      //   CONTRACT_ADDRESS,
      //   Greeter.abi,
      //   provider
      // );
      // const data = await contract.greet();
      // console.log("fetchGreeting: ", data);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  // call the smart contract, send an update
  // async function setGreeting() {
  //   const signer = provider.getSigner();

  //   const contract = new ethers.Contract(CONTRACT_ADDRESS, Greeter.abi, signer);

  //   const tx = await contract.setGreeting(form.message);

  //   console.log(`Transaction hash: ${tx.hash}`);

  //   const response = await tx.wait();

  //   console.log(`Transaction confirmed in block ${response.blockNumber}`);

  //   console.log(`Gas used: ${response.gasUsed.toString()}`);

  //   fetchGreeting();
  // }

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found an account! Address: ", accounts[0]);

      setUserAddress(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const setGreeting = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          "ABI EKLEYECEĞİZ",
          signer
        );

        console.log("Initialize payment");

        const nftTxn = await contract.setGreeting(
          "Blockchain için Furkan Türkyılmaz Ulaşın",
          {
            value: ethers.utils.parseEther("0.01"),
          }
        );

        console.log("Mining... please wait");

        await nftTxn.wait();

        console.log(
          `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="cta-button connect-wallet-button">
        Connect Wallet
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();

    fetchGreeting();

    // getDrinks();
  }, []);

  function Address({ userAddress }) {
    return (
      <span className="address">
        {userAddress.substring(0, 5)}…
        {userAddress.substring(userAddress.length - 4)}
      </span>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {userAddress ? (
          <div>
            Connected with <Address userAddress={userAddress} />
          </div>
        ) : (
          connectWalletButton()
        )}
        <div>
          <button onClick={fetchGreeting}>Greeting</button>
        </div>
        <div>
          <input type="text" value={"332234"} readOnly />
        </div>

        <div>
          <button onClick={setGreeting}>Set Greeting</button>
        </div>
        {/* <input
          onChange={(e) => setToAccount(e.target.value)}
          placeholder="To address"
        /> */}
        {/* <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to send"
        /> */}
      </header>
    </div>
  );
}

export default App;
