## What is this website for?

This sandbox helps you explore Bitcoin self-custody. It visualizes the different hardware and software components, their functions, how they connect, and how data flows between them.

## How to use this website

On the main interface, click the icons to explore different software and hardware. You'll see their features, compatibility, connection methods (USB, QR code, etc.), and a security assessment of your current setup.

1. **Build your setup:** Click a *pulsing icon* to select it.
2. **Follow the flow:** Once you pick a component (e.g., a Hardware Signer), compatible options in other columns (like Software Wallets) will pulse.
3. **Complete the chain:** Your setup is complete when you have selected a "Hardware Signer," "Software Wallet," and "Node."

**Tip:** Click any *dimmed icon* to **reset** your choices and start over.

**Example Flow:**
1. Select **Blockstream Jade** (Hardware Signer).
2. Compatible wallets like **BlueWallet**, **Electrum**, or **Nunchuk** will pulse. Select one.
3. Finally, select a **Node** to complete the setup.

Once paired, you'll see connection details (like "USB" or "QR Code") between your devices.

**Multisig Mode:**
In "Multisig" mode, you select multiple hardware signers. We recommend choosing your **Software Wallet** first in this mode, as it determines which signers are compatible.

## Why do I need multiple devices? Can't I just use a phone app?

You *can* just use a phone app (a "Software Wallet"), but it's less secure.

A complete Bitcoin setup involves three distinct functions:
1.  **Key Storage & Signing:** Protecting your private keys.
2.  **Wallet Management:** Constructing transactions and viewing history.
3.  **Network Communication:** Broadcasting transactions to the Bitcoin network.

A phone app does all three. However, keeping your private keys on an internet-connected device (your phone) exposes them to remote attacks.

**Self-custody separates these concerns:** A **Hardware Signer** isolates your keys from the internet, significantly improving security. This website helps you understand and build this more secure architecture.

## What does the progress bar mean?

The progress bar shows how complete and secure your setup is.
*   **100%:** You have a working setup (Signer + Wallet + Public Node).
*   **120%:** You are running your own Node, which provides better privacy than relying on public servers.

## Can I use only a software wallet?

Yes. Select the **"No Signer"** option in the first column. This represents a standard "hot wallet" setup where keys are stored on your computer or phone.

## What criteria determine which wallets are listed?

We prioritize **Bitcoin-only** tools.
*   **Software Wallets:** Must be Bitcoin-only.
*   **Hardware Signers:** Must be Bitcoin-only or support Bitcoin-only firmware.
We also consider market share and support for modern features (like Taproot and Miniscript).

## What is "Air-gapped"?

**Air-gapped** means the device *never* physically connects to a computer or the internet (no USB, no Bluetooth). Instead, it communicates via **QR codes** (camera) or **microSD cards**. This strictly isolates your private keys from online malware.

## Can I use an old offline phone as a signer?

Yes! If you install a wallet on an old phone, put it in airplane mode, and never connect it to the internet, it functions just like a hardware signer.

## What is "Multisig"?

*   **Single-Sig:** One key, one signature to spend. Like a standard key to your door.
*   **Multisig:** Multiple keys, multiple signatures required. Like a bank vault requiring 2 out of 3 keys to open.

A common setup is **2-of-3 Multisig**: You create a wallet with 3 keys. You only need *any 2* of them to move funds. This offers redundancy: if you lose one key, you don't lose your coins.

## What is a "Descriptor"?

An **Output Descriptor** is a technical string (like a mathematical formula) that describes exactly how to derive your wallet addresses from your public keys.

*   **Crucial for backup:** In multisig setups, you *must* back up your descriptor. Without it, you might have the keys but not know which addresses to look for.
*   **Privacy only:** Descriptors contain public keys, not private keys. Someone with your descriptor can see your balance but cannot spend your funds.

## Does this website collect data?

**No.** There is no tracking or data collection.
The code is open source. You can audit it or run it offline: [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)
