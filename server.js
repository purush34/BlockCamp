const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static('public'));

app.get('/callFunction', (req,res) => {
    console.log("Function called")
  // Call the function
  
  // Send a response back to the client
  res.send(create_Event());
});
app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/dashboard.html');
});
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file when the root URL is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"public"  , 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
function create_Event(){
		console.log("Function called")

		const Web3 = require('web3');
        const { ethers } = require("ethers");
        const { Web3Provider } = require("@ethersproject/providers");

        // Connect to the network and provider
        const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.g.alchemy.com/v2/7POV4zxSXYMf8j7hFKyIW8vEEJoH-kYM"));
        const web3Provider = new Web3Provider(web3.currentProvider);

        // Load the wallet using a private key
        const privateKey = "271a80c98a85460b2222fbda1cc75f65c78695f278d4ae15037222a4de683093";
        const wallet_address = "0x8459fBBA57a8ACbE41aee4AaCC7182143E883DdF";
        const wallet = new ethers.Wallet(privateKey, web3Provider);

        // Load the contract interface and connect to the contract
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractABI = [
        "function createEvent(string memory name,uint start_date,uint end_date,string memory location) public",
        "function getEvents() external view returns ((address, string memory, uint, uint, string memory)[] memory)"
        ];
        const contract = new ethers.Contract(contractAddress, contractABI, wallet);

        // Create a new event
        async function createEvent(name, start_date, end_date, location) {
            try {
            const gasLimit = 100000;
            const tx = await contract.createEvent(name, start_date, end_date, location, { gasLimit });

            // console.log("Transaction:")
            console.log("Transaction:", tx);
            return "Transaction: \n" + tx;
        } catch (err) {
            console.error("Error:", err);
            console.log("Revert message:", err.data);
            return "Error";
        }
        }


        createEvent("My Event", 2, 5, "Vancouver");


}
