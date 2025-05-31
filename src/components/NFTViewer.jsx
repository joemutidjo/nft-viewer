import { useState } from "react";
import { ethers } from "ethers";
import MyNFT from "../abis/MyNFT.json";

const CONTRACT_ADDRESS = "0x0d97687A1840955614F058262E283f280035C0dA";
const TOKEN_ID = 1;

export default function NFTViewer() {
  const [metadata, setMetadata] = useState(null);
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState("");
  const [error, setError] = useState("");

  const connectWalletAndLoadNFT = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setWallet(accounts[0]);
      setConnected(true);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, MyNFT, provider);
      const tokenURI = await contract.tokenURI(TOKEN_ID);

      const metadataURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const res = await fetch(metadataURL);
      const json = await res.json();

      if (json.image.startsWith("ipfs://")) {
        json.image = json.image.replace("ipfs://", "https://ipfs.io/ipfs/");
      }

      setMetadata(json);
    } catch (err) {
      console.error(err);
      setError("Error loading NFT metadata or connecting wallet.");
    }
  };

  const etherscanUrl = `https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`;

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>🖼 NFT Viewer (Sepolia)</h1>

      <p style={{ textAlign: "center", fontStyle: "italic", color: "#555" }}>
        Make sure MetaMask is connected to the <strong>Sepolia test network</strong>
      </p>

      {!connected ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={connectWalletAndLoadNFT}
            style={{
              backgroundColor: "#6366f1",
              color: "white",
              border: "none",
              padding: "12px 24px",
              fontSize: "16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Connect MetaMask
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#10b981" }}>✅ Connected wallet: <code>{wallet}</code></p>
      )}

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p><strong>Contract:</strong>{' '}
          <a href={etherscanUrl} target="_blank" rel="noreferrer" style={{ color: "#3b82f6" }}>
            {CONTRACT_ADDRESS}
          </a>
        </p>
        <p><strong>Token ID:</strong> {TOKEN_ID}</p>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {!metadata && connected && <p style={{ textAlign: "center" }}>Loading NFT metadata...</p>}

      {metadata && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <a href={metadata.image} target="_blank" rel="noreferrer">
            <img
              src={metadata.image}
              alt={metadata.name}
              style={{
                maxWidth: "300px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
              }}
            />
          </a>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>{metadata.name}</h2>
            <p style={{ color: "#444" }}>{metadata.description}</p>

            <h3 style={{ marginTop: "20px" }}>🧾 Full Metadata</h3>
            <pre
              style={{
                backgroundColor: "#f3f4f6",
                padding: "16px",
                borderRadius: "8px",
                overflowX: "auto",
                fontSize: "14px",
                maxHeight: "400px",
              }}
            >
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
