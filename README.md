# MergiFi - GitLab Web3 Bounty Agent

An autonomous Software Development Life Cycle (SDLC) agent designed to accelerate the code review process and bounty distribution for open-source contributors.

MergiFi acts as a bridge between GitLab, an AI evaluator (DeepSeek), and the blockchain network (Base Sepolia). The agent autonomously evaluates every Merge Request (MR). If the code meets the quality standards, it automatically triggers a smart contract to send the payment directly to the contributor's crypto wallet.

## Core Features

1. **GitLab Webhook Listener:** Receives events when an MR is created or updated (strictly `opened` or `update` actions).
2. **Context Extractor Engine:** Fetches the raw `git diff` text from the MR using the GitLab API.
3. **Strict AI Evaluator:** Uses the DeepSeek API to read the code diff and extract the wallet address. The output is strictly forced into pure JSON format.
4. **Web3 Execution Layer:** Uses `ethers.js` v6 to sign and send transactions to the smart contract on Base Sepolia Testnet (triggered only if AI score > 80 and CI/CD is `passed`).
5. **Feedback Loop Auto-Commenter:** Posts the evaluation results, AI score, and blockchain TxHash link back to the GitLab MR thread as proof of work.

## User Flow

1. Contributor creates a Merge Request on GitLab and includes their EVM wallet address in the description.
2. GitLab sends a webhook payload to the agent's Node.js server.
3. The agent retrieves the actual code changes from the MR.
4. DeepSeek AI evaluates the code and returns the score along with the wallet address in JSON.
5. If the score is > 80 and CI/CD passes, the agent executes the `payBounty` function on the smart contract. If the score is below 80, the payment is skipped.
6. The agent posts a comment with the results and transaction proof on the MR thread.

## Agent Rules (Absolute Laws)

**DO's:**

- Strict Trigger Validation (only `merge_request` with `opened` or `update` actions).
- Pure JSON Execution.
- Double Requirement Check (AI Score > 80 & CI/CD passed).
- Transparent Audit Trail (TxHash comment on GitLab).
- Secure Fail-Safe (log errors without blind retries).

**DON'Ts:**

- Do not hallucinate wallet addresses (fail if missing in the description).
- Do not interact interactively (one-way execution only).
- Do not exceed bounty funds (enforce hard limits).
- Do not evaluate own code.

## Smart Contract Deployment

This project utilizes the **Base Sepolia** testnet network for its Web3 execution layer to ensure fast and low-cost transactions.

For the smart contract deployment, we use **Remix IDE** (an online Ethereum development environment). You can write, compile, and deploy the Solidity smart contract directly to the Base Sepolia network from your browser by connecting your Web3 wallet (e.g., MetaMask).

## Environment Variables

To run the agent, you need to configure the following variables in your `.env` file:

```env
PORT=
GITLAB_ACCESS_TOKEN=
GITLAB_WEBHOOK_SECRET=
AI_API_KEY=
RPC_URL=
PRIVATE_KEY=
BOUNTY_CONTRACT_ADDRESS=
BOUNTY_AMOUNT=
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

### Explanation of Variables:

- **`PORT`**: The port number on which the Node.js webhook server will run (e.g., `3000`).
- **`GITLAB_ACCESS_TOKEN`**: Personal Access Token from GitLab used by the agent to fetch the Git diff and post comments on MRs.
- **`GITLAB_WEBHOOK_SECRET`**: A secret token to verify that incoming webhook requests genuinely originate from your GitLab repository.
- **`AI_API_KEY`**: API key for the DeepSeek AI used to evaluate the code diff.
- **`RPC_URL`**: The RPC endpoint URL for the Base Sepolia Testnet to connect to the blockchain.
- **`PRIVATE_KEY`**: The private key of the agent's crypto wallet used to sign the Web3 bounty transactions. Keep this extremely secure.
- **`BOUNTY_CONTRACT_ADDRESS`**: The deployed smart contract address on the blockchain that handles the bounty distributions.
- **`BOUNTY_AMOUNT`**: The fixed or default amount of tokens/ETH to be disbursed per successful Merge Request.
- **`TURSO_DATABASE_URL`**: The connection URL for the Turso (SQLite) database, used to track processed MRs and audit trails.
- **`TURSO_AUTH_TOKEN`**: The authentication token to securely connect to the Turso database.

## Frontend Dashboard

The application includes an ultra-minimalist read-only control panel for Admins:

- **Landing Page:** Static guide explaining how the system works and contributor rules.
- **Public Ledger:** Displays key metrics (Total Evaluated MRs, Disbursed Bounties, AI Pass Rate) and a live transaction log table.

**Tech Stack:** Next.js + Tailwind CSS. Typography uses **Space Grotesk** (Headings) and **Inter** (Body), with **JetBrains Mono** for technical elements.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
