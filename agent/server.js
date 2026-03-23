const express = require('express');
const axios = require('axios');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
app.use(express.json());

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

// Stage 4: Agent's Brain (AI Evaluator)
async function evaluateCode(diffText, description) {
    const prompt = `You are a strict and ruthless AI evaluator for a Web3 Hackathon.
You will evaluate the following code changes and determine a quality score from 0-100.
ABSOLUTE RULE: You MUST respond ONLY in raw, pure JSON format. ABSOLUTELY NO markdown, no backticks, no conversational text.

Required JSON structure:
{
  "score": <number 0-100>,
  "wallet_address": "<extract exact Ethereum wallet address from description, or null if not found>",
  "reasoning": "<short string explaining why you gave this score>"
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
async function sendBounty(walletAddress) {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    
    // Minimal ABI for external interaction
    const abi = ["function payBounty(address payable recipient) public"];
    const contract = new ethers.Contract(process.env.BOUNTY_CONTRACT_ADDRESS, abi, wallet);
    
    console.log(`Executing payBounty sequence to ${walletAddress}...`);
    // Assuming Arbitrum Sepolia
    const tx = await contract.payBounty(walletAddress);
    const receipt = await tx.wait();
    return receipt.hash;
}

// Stage 6: Agent's Mouth (Audit Trail Reporter)
async function postGitLabComment(projectId, mrIid, result, txHash) {
    const url = `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mrIid}/notes`;
    let message = `### MergiFi Autonomous Agent Evaluation\n\n`;
    message += `**AI Score:** ${result.score}/100\n`;
    message += `**Reasoning:** ${result.reasoning}\n`;
    
    if (result.score > 80 && txHash) {
        message += `**Status:** PASSED \u2705\n`;
        message += `**Bounty Disbursed!** [Arbitrum Sepolia TxHash: ${txHash}](https://sepolia.arbiscan.io/tx/${txHash})\n`;
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

// Stage 2: Agent's Ears (Trigger)
app.post('/webhook/gitlab', async (req, res) => {
    // Security Validation Function
    const gitlabToken = req.headers['x-gitlab-token'];
    
    if (gitlabToken !== process.env.GITLAB_WEBHOOK_SECRET) {
        console.log("Unauthorized request attempted.");
        return res.status(401).send('Unauthorized');
    }

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
        
        console.log("Evaluating via DeepSeek AI...");
        const aiResult = await evaluateCode(diffText, description);
        console.log(`AI Evaluation Complete. Score: ${aiResult.score}`);
        
        let txHash = null;
        if (aiResult.score > 80) {
            if (aiResult.wallet_address) {
                console.log(`Proceeding to Web3 Execution for wallet: ${aiResult.wallet_address}`);
                // Only send bouncy if > 80 score
                txHash = await sendBounty(aiResult.wallet_address);
                console.log("Bounty Sent! Tx Hash:", txHash);
            } else {
                console.log("AI Score > 80, but no valid wallet address found in description. Failed safe.");
                aiResult.reasoning += " (Wallet address invalid or missing)";
            }
        } else {
            console.log("Bounty conditions not met. Discarding transaction.");
        }
        
        console.log("Posting Audit Trail Comment...");
        await postGitLabComment(projectId, mrIid, aiResult, txHash);
        
    } catch (err) {
        console.error("Fatal Error in Pipeline:", err.message);
    }
});

app.listen(PORT, () => {
    console.log(`MergiFi Agent listening on port ${PORT}`);
});
