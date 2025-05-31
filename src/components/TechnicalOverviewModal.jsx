// src/components/TechnicalOverviewModal.jsx
import React from 'react';
import './Modal.css';

export default function TechnicalOverviewModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>🔍 Technical Overview</h2>
        <p><strong>Technologies Used</strong></p>
        <ul>
          <li>Ethereum Sepolia Testnet</li>
          <li>ERC-721 Smart Contract (NFT)</li>
          <li>IPFS via Web3.Storage</li>
          <li>MetaMask (for wallet connection)</li>
          <li>ethers.js (for blockchain interaction)</li>
          <li>React + Vite (for UI)</li>
        </ul>
        <p><strong>How It Works</strong></p>
        <ol>
          <li>User connects MetaMask with Sepolia testnet</li>
          <li>Contract is queried for tokenURI</li>
          <li>Metadata is fetched from IPFS</li>
          <li>Metadata + image are displayed</li>
          <li>User can disconnect/reset viewer</li>
        </ol>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
