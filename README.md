# 🦄 Decentralized Exchange on Ethereum 

This is a full-stack **Decentralized Exchange (DEX)** built using the **PERN stack** (PostgreSQL, Express, React, Node.js) and **Solidity** on Ethereum using **Hardhat**. It enables users to connect their wallet, provide liquidity, and swap tokens on-chain using smart contracts.

---

## 🚀 Features

- 🪙 ERC20 Token Swaps via Automated Market Maker (AMM)
- 💧 Liquidity Pools (Add/Remove)
- 🔐 WalletConnect with MetaMask
- 📊 Transaction History stored in PostgreSQL
- 💥 Deployed on Ethereum Sepolia Testnet
- 💻 Full-stack integration: Smart contracts ↔ Frontend ↔ Backend ↔ DB

---

## 🏗️ Tech Stack

| Layer         | Tech                                      |
|---------------|-------------------------------------------|
| Smart Contract| Solidity, Hardhat                         |
| Frontend      | React, TailwindCSS, Ethers.js             |
| Backend       | Express.js, Node.js, PostgreSQL           |
| Database      | PostgreSQL                                |
| Blockchain    | Ethereum (Sepolia testnet)                |

---

## 📁 Folder Structure

```bash
eth-dex/
├── contracts/             # Hardhat Smart Contracts
│   ├── contracts/         # DEX.sol, Token.sol, etc.
│   ├── scripts/           # Deployment scripts
│   ├── test/              # Contract tests
│   └── hardhat.config.js  # Hardhat config
│
├── backend/               # Node.js + Express + PostgreSQL
│   ├── controllers/       # API logic
│   ├── routes/            # Express routes
│   ├── models/            # Sequelize/DB models
│   └── index.js           # Entry point
│
├── client/                # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── public/
│
├── .env                   # Environment config
└── README.md
