const express = require('express');
const axios = require('axios');
const ethers = require('ethers');
const { createClient } = require("@libsql/client");
require('dotenv').config();

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Stage: Autonomous DB Initialization
async function initDB() {
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS ledger (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mr_id INTEGER,
            score INTEGER,
            wallet TEXT,
            tx_hash TEXT,
            status TEXT,
            created_at TEXT
        )
    `);
    
    // PATCH DARURAT: Paksa tambahkan kolom jika belum ada
    try {
        await turso.execute(`ALTER TABLE ledger ADD COLUMN created_at TEXT`);
        console.log("[DATABASE] Column created_at forcefully added.");
    } catch (e) {
        // Abaikan error jika kolom ternyata sudah ada
        console.log("[DATABASE] Column created_at already exists.");
    }

    console.log("[DATABASE] Turso DB Ready.");
}
initDB();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[RADAR] Incoming request: ${req.method} ${req.url}`);
    next();
});

// Endpoint untuk menipu sistem auto-sleep Render
app.get('/ping', (req, res) => {
    res.status(200).send("Agent is awake and breathing.");
});

const PORT = process.env.PORT || 4000;

// Stage 3: Agent's Eyes (Data Reader)
async function fetchGitDiff(projectId, mrIid) {
    const url = `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mrIid}/changes`;
    const res = await axios.get(url, {
        headers: {
            'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN
        }
    });
    
    let diffText = '';
    if (res.data && res.data.changes) {
        res.data.changes.forEach(change => {
            diffText += `File: ${change.new_path}\n${change.diff}\n\n`;
        });
    }
    
    return { diffText, description: res.data.description };
}

// Stage 3.5: Fetch Repository Context (README.md)
async function fetchRepoReadme(projectId) {
    try {
        // Fetch README from default branch (main/master)
        const url = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/README.md/raw?ref=main`;
        const res = await axios.get(url, {
            headers: { 'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN }
        });
        return res.data; // Raw README text
    } catch (e) {
        console.log("README.md not found or failed to fetch.");
        return "No project description available.";
    }
}

// Stage 4: Agent's Brain (AI Evaluator)
async function evaluateCode(diffText, description, readmeText) {
    const prompt = `You are a context-aware Autonomous AI Reviewer.
Your job is to read the project's README to understand its core purpose, and then evaluate the proposed Merge Request (code diff) based on how relevant and useful it is to that purpose.

Project Context (README.md):
"""
${readmeText}
"""

Task:
1. Analyze the Project Context to understand what this project does.
2. Evaluate the Code Diff. Does it add value to the core purpose? Is the code quality good?
3. Determine a score from 0-100. Give a high score (>80) ONLY if the code is structurally sound and directly fulfills the core purpose described in the README. Give a low score if the code is irrelevant, trivial, or malicious.

ABSOLUTE RULE: You MUST respond ONLY in raw, pure JSON format.
Required JSON structure:
{
  "score": <number 0-100>,
  "wallet_address": "<extract exact EVM wallet from description, or null>",
  "reasoning": "<short explanation linking the code changes to the project's goals>"
}

Merge Request Description:
${description}

Code Diff:
${diffText}
`;

    try {
        const response = await axios.post('https://api.deepseek.com/chat/completions', {
            model: "deepseek-chat",
            messages: [{ role: "system", content: prompt }],
            temperature: 0.1
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const rawText = response.data.choices[0].message.content;
        
        // Robust Format Error Catcher
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if(!jsonMatch) throw new Error("AI hallucinated and did not return valid JSON");
        
        const result = JSON.parse(jsonMatch[0]);
        return result;
    } catch (e) {
        console.error("AI Evaluation failed or format was invalid:", e.message);
        throw e; // Safely crash this specific pipeline execution
    }
}

// Stage 5: Financial Muscle (Web3 Executor)
async function executeBountyPayout(walletAddress) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    // ABI SYNCED: Removed 'payable' as the contract doesn't accept it here
    const abi = ["function payBounty(address recipient) public"];
    
    // Ensure this contract address is the one you JUST deployed
    const contract = new ethers.Contract(process.env.BOUNTY_CONTRACT_ADDRESS, abi, wallet);
    
    console.log(`Executing payBounty sequence to ${walletAddress}...`);

    // CLEAN EXECUTION: Removed { value: amount } as contract pays from its own balance
    const tx = await contract.payBounty(walletAddress);
    await tx.wait(); // Wait for confirmation
    return tx; // Return tx object which has .hash
}

// Stage 6: Agent's Mouth (Audit Trail Reporter)
async function postGitLabComment(projectId, mrIid, result, txHash) {
    const url = `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mrIid}/notes`;
    let message = `### MergiFi Autonomous Agent Evaluation\n\n`;
    message += `**AI Score:** ${result.score}/100\n`;
    message += `**Reasoning:** ${result.reasoning}\n`;
    
    if (result.score >= 80 && txHash !== "N/A") {
        message += `**Status:** PASSED \u2705\n`;
        message += `**Bounty Disbursed!** [Base Sepolia TxHash: ${txHash}](https://sepolia.basescan.org/tx/${txHash})\n`;
    } else {
        message += `**Status:** FAILED \u274c\n`;
        message += `Failed to meet the >= 80 score threshold, or missing/invalid EVM wallet address.\n`;
    }

    try {
        await axios.post(url, { body: message }, {
            headers: {
                'PRIVATE-TOKEN': process.env.GITLAB_ACCESS_TOKEN
            }
        });
    } catch(err) {
        console.error("Failed to post comment to GitLab:", err.response ? err.response.data : err.message);
    }
}

// Stage: Open Ledger Logger
async function logToLedger(mrId, score, wallet, txHash, status) {
    const createdAt = new Date().toISOString(); 
    console.log(`Recording evaluation to Open Ledger at ${createdAt}...`);

    try {
        await turso.execute({
            sql: `INSERT INTO ledger (mr_id, score, wallet, tx_hash, status, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
            args: [mrId, score, wallet, txHash, status, createdAt]
        });
        console.log(`[LEDGER] Evaluation recorded for MR #${mrId} with status: ${status}`);
    } catch (error) {
        console.error("[FATAL] Failed to write to Turso:", error);
    }
}

// Stage 2: Agent's Ears (Trigger)
app.post('/webhook/gitlab', async (req, res) => {
    // 1. CAPTURE HEADERS (EXPRESS USES LOWERCASE!)
    const gitlabToken = req.headers['x-gitlab-token']; 
    const localSecret = process.env.GITLAB_WEBHOOK_SECRET;

    // 2. MILITARY DIAGNOSTICS (MUST BE ABOVE ALL OTHER LOGIC)
    console.log("=== AUTHENTICATION DIAGNOSTICS ===");
    console.log("GitLab Token  :", gitlabToken);
    console.log("Local Token   :", localSecret);
    console.log("=============================");

    // 3. STRICT VALIDATION
    if (gitlabToken !== localSecret) {
        console.log("[REJECTED] Token mismatch!");
        return res.status(401).send('Unauthorized');
    }

    console.log("[ACCEPTED] Token match. Processing payload...");

    const { object_kind, object_attributes, project } = req.body;
    
    // DO: Validasi Pemicu Secara Kaku from AGENT.md
    if (object_kind !== 'merge_request') {
        return res.status(200).send('Ignored: Not a merge request');
    }
    
    if (object_attributes.action !== 'open' && object_attributes.action !== 'update') {
        return res.status(200).send('Ignored: Action not open or update');
    }

    const projectId = project.id;
    const mrIid = object_attributes.iid;
    
    console.log(`\nWebhook Triggered! Project ID: ${projectId}, MR IID: ${mrIid}`);
    
    // Acknowledge early to prevent timeout
    res.status(200).send('Processing in background');

    try {
        console.log("Fetching Git Diff...");
        const { diffText, description } = await fetchGitDiff(projectId, mrIid);
        
        console.log("Fetching Repository Context (README)...");
        const readmeText = await fetchRepoReadme(projectId);
        
        console.log("Evaluating via DeepSeek AI...");
        const aiResult = await evaluateCode(diffText, description, readmeText);
        console.log(`AI Evaluation Complete. Score: ${aiResult.score}`);
        
        let txHash = "N/A";
        let status = "REJECTED";

        if (aiResult.score >= 80) {
            if (aiResult.wallet_address) {
                console.log("Proceeding to Web3 Execution...");
                const tx = await executeBountyPayout(aiResult.wallet_address);
                txHash = tx.hash;
                status = "PAID";
                console.log(`Bounty Sent! Tx Hash: ${txHash}`);
            } else {
                console.log("Score >= 80, but no valid wallet address found. Bounty rejected.");
                aiResult.reasoning += " (Missing/invalid wallet address)";
            }
        } else {
            console.log("Score below 80. Bounty rejected.");
        }

        // SIMPAN KE DATABASE APAPUN HASILNYA (Lulus atau Gagal)
        console.log("Recording evaluation to Open Ledger (Turso)...");
        await logToLedger(mrIid, aiResult.score, aiResult.wallet_address || "N/A", txHash, status);
        
        console.log("Posting Audit Trail Comment...");
        await postGitLabComment(projectId, mrIid, aiResult, txHash);
        
    } catch (err) {
        console.error("Fatal Error in Pipeline:", err.message);
    }
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SUCCESS] MergiFi Agent active on port ${PORT}`);
    console.log(`[STATUS] Waiting for GitLab webhooks...`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`[ERROR] Port ${PORT} is already in use by another application!`);
    } else {
        console.error(`[ERROR] Fatal server error:`, err.message);
    }
    process.exit(1);
});

// Handle graceful shutdown (Ctrl+C)
process.on('SIGINT', () => {
    console.log("\n[STOP] Shutting down agent... Goodbye!");
    server.close(() => process.exit(0));
});
