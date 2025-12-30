## What Is Bitcoin Self-Custody Playground?

This is a sandbox designed to help you explore the various hardware and software components involved in Bitcoin self-custody. It visualizes how these pieces fit together, what each one does, and how they communicate. Use it to experiment with different setups and understand the data flow between your devices.

## How do I use this tool?

On the main dashboard, you can click on various icons to explore hardware and software options. As you make selections, the tool provides:
- Key features and technical specs of each component.
- Real-time compatibility filtering (highlighting what works with your current setup).
- Connection methods (e.g., USB, QR codes, microSD).
- A dynamic security assessment of your overall architecture.

**The Workflow:**
- Icons with a **pulsing effect** are available to be added. Click one to **select** it.
- **Active (highlighted)** icons represent your current setup. Click an active icon to **remove** it; the tool will maintain your other choices so you can swap components easily.
- **Dimmed (inactive)** icons are either incompatible with your current selection or can be clicked to **reset** that entire category.
- Once you have selected a **Hardware Signer**, a **Software Wallet**, and a **Node**, your setup is complete. You can then review the full security analysis at the top and the feature breakdown at the bottom.
- If you ever feel stuck, simply **refresh the page** to start over from scratch :)

**Note for Multisig:** 
The Multisig page works slightly differently. We recommend choosing your **Software Wallet** first, as it will determine which hardware signers are compatible with that specific coordinator.

## Why so many components? Can't I just use a wallet app?

While some mobile apps simplify the experience by hiding the complexity, a complete Bitcoin setup always involves three distinct roles:
1. **Key Management & Signing:** Generating and storing your private keys and signing transactions.
2. **Transaction Coordination:** Tracking your history, managing balances, and constructing new transactions.
3. **Network Validation:** Communicating with the Bitcoin network to verify incoming funds and broadcast new transactions.

A standard "wallet app" on your phone often performs all three roles at once. While convenient, this "all-in-one" approach is less secure because your private keys are stored on an internet-connected device.

By separating these roles—specifically by using a **Hardware Signer** for keys and your own **Node** for network validation—you significantly harden your security. This tool exists to help you visualize and adopt these more robust practices.

## What does the progress bar mean? (And why "120%"?)

The progress bar tracks the completeness and security of your setup.
- A setup is considered "functional" (100%) once you have a Signer, a Wallet, and a connection to a Node.
- We show **120%** (or higher) as a nod to best practices: while you *can* use a public node to get up and running (100%), running your **own node** provides superior privacy and sovereignty, taking your setup "above and beyond" the standard configuration.

## Can I just use a software wallet alone?

Yes. From a functional standpoint, a software wallet can generate keys and sign transactions on its own. In this tool, selecting the **"No Signer"** option represents this "hot wallet" approach.

## How do you select which hardware and software to list?

We prioritize tools that are **"Bitcoin-only"** or have a strong Bitcoin-first focus. 
- **Software Wallets:** Must be Bitcoin-only.
- **Hardware Signers:** Must be Bitcoin-only or offer Bitcoin-only firmware. 
We also consider market reputation, open-source status, and support for modern features like Taproot and Miniscript.

## Does the "Features" box show everything?

No. The features box focuses on comparing similar products and highlighting unique selling points. Common industry standards (like support for standard address types) are generally assumed and not listed individually.

## What exactly is "Air-gapped"?

For a hardware signer, "Air-gapped" means the device never has a direct, persistent connection (like USB or Bluetooth) to an internet-connected computer or phone. Instead, data is transferred via "stateless" methods such as:
- **QR Codes:** Using a camera to scan data.
- **microSD Cards:** Physically moving a card between devices.

This ensures that even if your computer is compromised, the attacker cannot reach your private keys through a digital cable.

## Can I use an old, offline device as a hardware signer?

Absolutely. If you take an old phone or laptop, wipe it, install a wallet app, and keep it permanently offline, it functions on the same principle as a dedicated hardware signer. The security depends on how strictly you maintain that "air gap."

## What is Multisig? And what's a "Threshold"?

Bitcoin allows you to create addresses that require more than one signature to spend funds. 
- **Single-Sig:** One key, one signature. If you lose the key or it's stolen, your funds are gone.
- **Multisig:** Multiple keys are used to build one address. You can set a **Threshold** (e.g., 2-of-3), meaning you need any 2 out of the 3 keys to move the money.

This provides both **security** (an attacker needs to steal multiple keys) and **redundancy** (if you lose one key, you can still recover your funds with the remaining ones).

## What is a "Wallet Descriptor"?

A descriptor is a human-readable string that acts as a "recipe" for your wallet. It describes exactly how your addresses are derived from your public keys.

In a Multisig setup, backing up your keys is not enough; you **must** also back up the descriptor. Without it, you might have all your keys but no way to know which specific mathematical path leads to your balance. Descriptors contain public information only—they cannot be used to spend your funds, but they should be kept private to protect your financial history.

## Does this website collect my data?

Not at all. This is a purely client-side educational tool. There are no tracking scripts, no database, and no data collection modules.

In fact, the project is completely open-source. You can download the code and run it locally on an offline machine if you prefer.
- **Source Code:** [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)
