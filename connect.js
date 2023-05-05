const connectWallet = async () => {
if (sessionStorage.getItem("login") != "true") {
            try {
        const { ethereum } = window;
        if (!ethereum) {
        document.body.innerHTML = 'Metamask is not detected. Redirecting to download page...';
        setTimeout(function() {
        window.location.href = 'https://metamask.io/download.html';
        }, 3000);
        return;
        }

        // Connect to custom Polygon Mumbai network
        await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
            chainId: "0x13881", // Chain ID of Polygon Mumbai network
            chainName: "Polygon Mumbai Testnet",
            nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
            blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
            },
        ],
        });

        // Get connected chain ID
        const chainId = await ethereum.request({ method: "eth_chainId" });

        // Check if connected to Polygon Mumbai network
        if (chainId !== "0x13881") {
        alert("Please connect to Polygon Mumbai network.");
        return;
        }

        // Get accounts
        const accounts = await ethereum.request({ method: "eth_requestAccounts" });

        console.log("Connected to chain " + chainId);
        console.log("Found account:", accounts[0]);
        sessionStorage.setItem("login",true);
        sessionStorage.setItem("userId",accounts[0]);
        removeHideClass();


    } catch (error) {
        console.log("Error connecting to MetaMask", error);
    }
}
else{
    sessionStorage.removeItem("login");
    console.log("Logged out");
    addHideClass();
}

};

const goToDashboard =  () => {
var url = sessionStorage.getItem("userId");
url = "/dashboard/" + url;
window.location.href = url;
}

function removeHideClass(){
document.getElementById("login").style.display = "none";
document.getElementById("logout").style.display = "block";
document.getElementById("dashboard").style.display = "block";
}

function addHideClass(){
document.getElementById("logout").style.display = "none";
document.getElementById("dashboard").style.display = "none";
document.getElementById("login").style.display = "block";
}