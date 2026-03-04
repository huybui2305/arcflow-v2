# ArcFlow 🌐

<<<<<<< HEAD
> Cross-border Payments Dashboard — built natively on [Arc Network](https://arc.network)

**Live on Arc Testnet** · Sub-second USDC settlement · Fixed $0.001 fees · 148+ corridors

---

## Features (all real, on-chain)

| Feature | Implementation |
|---|---|
| 🔗 Connect Wallet | MetaMask / any EVM wallet, auto-adds Arc Testnet |
| 💵 Send USDC | Real ERC-20 transfer on Arc Testnet via `0x3600...` |
| 💶 Send EURC | Real ERC-20 transfer via `0x89B5...` |
| 📊 Live Block | Polling Arc RPC every 4s |
| 📜 TX History | Scans Transfer events from Arc RPC |
| ⚡ Confirm Time | Measured from submit → receipt (usually <1s) |
| 🔍 Explorer Links | Direct links to testnet.arcscan.app |

## Arc Network Config

```
RPC:      https://rpc.testnet.arc.network
Chain ID: 5042002
Explorer: https://testnet.arcscan.app
Faucet:   https://faucet.circle.com
```

## Contracts Used

```
USDC:  0x3600000000000000000000000000000000000000 (6 decimals, ERC-20)
EURC:  0x89B50855Aa3bE2F677cD6303Cec089B5F319D72a (6 decimals)
```

## Deploy to Vercel

### Option 1 — GitHub + Vercel (recommended)

```bash
# 1. Push to GitHub
git init && git add . && git commit -m "feat: ArcFlow on Arc Network"
git remote add origin https://github.com/YOUR_USERNAME/arcflow.git
git push -u origin main

# 2. Go to vercel.com/new → Import repo → Deploy
# Vercel auto-detects Next.js. No config needed.
```

### Option 2 — Vercel CLI

```bash
npm install
npx vercel --prod
```

### Option 3 — Local dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Tech Stack

- **Next.js 14** (App Router)
- **ethers.js v6** — wallet connect + on-chain reads/writes
- **TypeScript** — type safety
- **Tailwind CSS** — utility styles

## Getting Testnet USDC

1. Go to [faucet.circle.com](https://faucet.circle.com)
2. Select **Arc Testnet** + **USDC**
3. Enter your wallet address → Receive USDC

---

Built for Arc Network ecosystem · Open source · MIT
=======
**Cross-border Payments Dashboard built on [Arc Network](https://arc.network)**

Sub-second USDC settlement • Fixed $0.001 fees • 148+ corridors worldwide

---

## What is this?

ArcFlow is a showcase application built on Arc Network — the Layer-1 blockchain purpose-built for real-world economic activity. It demonstrates:

- **Cross-border payment UX** with live transaction feed
- **Treasury analytics** with volume charts and corridor metrics  
- **Arc's core value props**: deterministic finality, stable fees, USDC-native gas

## Deploy to Vercel in 2 minutes

### Option 1: One-click (recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repo → Click **Deploy**

That's it. Vercel auto-detects Next.js.

### Option 2: Vercel CLI

```bash
npm install -g vercel
npm install
vercel --prod
```

### Option 3: Manual

```bash
npm install
npm run build
npm run start
```

---

## Tech Stack

- **Next.js 14** — React framework
- **Tailwind CSS** — Styling
- **Framer Motion** — Animations
- **Lucide React** — Icons
- **TypeScript** — Type safety

## Arc Network Resources

- [Docs](https://docs.arc.network) — Start building
- [Testnet Explorer](https://testnet.arcscan.app) — View transactions
- [Circle Faucet](https://faucet.circle.com) — Get testnet USDC
- [Discord](https://discord.com/invite/buildonarc) — Community

---

Built with ❤️ for the Arc ecosystem
>>>>>>> 4d2356d0fb5fd286f507361ae208200f3b380b43
