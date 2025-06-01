'use strict';

// Konfiguration för API-nycklar och konstanter
// VIKTIGT: Dessa värden MÅSTE sättas via Vercel Environment Variables.
// Exempelvis kan Vercel bygga en env-config.js fil eller injicera dem.
// Här är de bara placeholders.
const WARPAI_CONFIG = {
  ALCHEMY_BASE_API_URL: `https://base-mainnet.g.alchemy.com/v2/${window.ALCHEMY_API_KEY || 'X2bNp1BarPcBcHiWR6vHxJz_lGbA'}`, // Ersätt med faktisk nyckel från Vercel env
  ETHERSCAN_API_KEY: window.ETHERSCAN_API_KEY || 'Y1VRJKQB1A4K2JTA8GE1YDH3W54W4I35D5', // Ersätt med faktisk nyckel från Vercel env
  WALLETCONNECT_PROJECT_ID: window.WALLETCONNECT_PROJECT_ID || '0bd9dbdd237566a423e52e836d2d687a', // WalletConnect v1 "key" can be used as project ID conceptually for v1 provider
  TARGET_CHAIN_ID: 8453, // Base Mainnet
  TARGET_CHAIN_NAME: 'Base',
  TRUST_WALLET_URI_FALLBACK: 'https://link.trustwallet.com/wc?uri='
};

// Globala variabler för wallet-status
let provider = null;
let signer = null;
let userAddress = null;
let currentWalletType = null; // 'metamask' or 'walletconnect'
let walletConnectProvider = null; // För att kunna hantera WalletConnect-specifik disconnect

// DOM Element-referenser (hämtas när DOM är laddad)
let connectWalletBtn, walletAddressDisplay, xpDisplayHeader, totalXPDisplay, currentXPDisplayHome;
let claimTokenBtn, buyTokenBtn, upgradeBtn;
let qrModal, qrCodeDiv;
let onboardingOverlay, appContent;
// ... (fler element kommer att definieras i DOMContentLoaded)

// Hjälpfunktion för att förkorta adresser
function shortenAddress(address, chars = 4) {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Initiering när DOM är fullständigt laddad
document.addEventListener('DOMContentLoaded', () => {
  // Initiera DOM-element
  onboardingOverlay = document.getElementById('onboardingOverlay');
  appContent = document.getElementById('appContent');
  connectWalletBtn = document.getElementById('connectWallet');
  const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
  walletAddressDisplay = document.getElementById('walletAddress'); // Header
  const walletAddressProfileDisplay = document.getElementById('walletAddressProfile'); // Profile
  xpDisplayHeader = document.getElementById('xpDisplay');
  totalXPDisplay = document.getElementById('totalXPProfile'); // Profile
  currentXPDisplayHome = document.getElementById('currentXP'); // Home
  claimTokenBtn = document.getElementById('claimTokenBtn');
  buyTokenBtn = document.getElementById('buyTokenBtn');
  upgradeBtn = document.getElementById('upgradeBtn');
  qrModal = document.getElementById('qrModal');
  qrCodeDiv = document.getElementById('qrCode');

  // Onboarding-logik
  if (onboardingOverlay && appContent) {
    console.log('Onboarding overlay and app content found');
    setTimeout(() => {
      onboardingOverlay.classList.add('fade-out-logo');
      onboardingOverlay.addEventListener('animationend', () => {
        onboardingOverlay.style.display = 'none';
        appContent.style.display = 'block';
        console.log('Onboarding hidden, app content shown');
      }, { once: true });
    }, 2000); // Visas i 2 sek, sedan fade out (0.5s) = 2.5s totalt. Översikt sa 3 sek.
  } else {
    console.error('Onboarding overlay or app content not found. Skipping onboarding animation.');
    if (appContent) appContent.style.display = 'block';
  }

  // Fliknavigering
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');
      button.classList.add('active');
      const targetTabId = button.dataset.tab;
      const targetTab = document.querySelector(`.tab-content[data-tab="${targetTabId}"]`);
      if (targetTab) targetTab.style.display = 'block';
    });
  });

  // Event Listeners för knappar
  if (connectWalletBtn) {
    connectWalletBtn.addEventListener('click', handleConnectDisconnect);
  }
  if (connectWalletProfileBtn) { // Knapp i profilsektionen
    connectWalletProfileBtn.addEventListener('click', handleConnectDisconnect);
  }
  const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
  if (disconnectProfileBtn) {
      disconnectProfileBtn.addEventListener('click', disconnectWallet);
  }


  if (claimTokenBtn) {
    claimTokenBtn.addEventListener('click', handleClaimToken);
  }

  // Mockade knappar (som i din ursprungliga kod)
  if (buyTokenBtn) buyTokenBtn.addEventListener('click', () => showToast('Token buy functionality (mock) coming soon!', 'info'));
  if (upgradeBtn) upgradeBtn.addEventListener('click', () => showToast('Upgrade to Premium for $5 (mock) coming soon!', 'info'));
  
  // Hantera delningsknappar med gemensam logik (klassbaserad)
  // Antag att index.html har class="copy-referral-action", class="share-farcaster-action", class="share-x-action"
  document.querySelectorAll('.copy-referral-action').forEach(btn => {
    btn.addEventListener('click', handleCopyReferral);
  });
  document.querySelectorAll('.share-farcaster-action').forEach(btn => {
    btn.addEventListener('click', () => handleShare('farcaster'));
  });
  document.querySelectorAll('.share-x-action').forEach(btn => {
    btn.addEventListener('click', () => handleShare('x'));
  });
  
  // För specifika ID-baserade delningsknappar om de finns kvar
  // Exempel från din originalkod (justera ID:n om de ändrats i HTML)
  const shareOnXBtnProfile = document.getElementById('shareOnXBtnProfile');
  if (shareOnXBtnProfile) shareOnXBtnProfile.addEventListener('click', () => handleShare('x', 'profile'));

  const shareOnFarcasterBtnProfile = document.getElementById('shareOnFarcasterBtnProfile');
  if (shareOnFarcasterBtnProfile) shareOnFarcasterBtnProfile.addEventListener('click', () => handleShare('farcaster', 'profile'));
  
  const postFarcasterBtnRewards = document.getElementById('postFarcasterBtnRewards');
  if (postFarcasterBtnRewards) {
      postFarcasterBtnRewards.addEventListener('click', () => {
          const warpcastText = encodeURIComponent("Checking out WarpAi for onchain tracking! #WarpAi @warp_ai");
          window.open(`https://warpcast.com/~/compose?text=${warpcastText}`, '_blank');
          showToast('Posted to Farcaster (mock)! +10 WAI', 'success');
          // Potentiellt anropa updateXPUI eller liknande här
      });
  }


  // Återställ UI vid laddning
  updateWalletUI();
  updateXPUI(0); // Start XP, kommer uppdateras om ansluten och data hämtas
});

// ----- WALLET CONNECTION LOGIC ----- //
async function handleConnectDisconnect() {
  if (userAddress) {
    await disconnectWallet();
  } else {
    // Försök ansluta med MetaMask först, sedan WalletConnect som fallback
    try {
      showToast('Attempting to connect wallet...', 'info', 1000);
      await connectMetaMask();
    } catch (metaMaskError) {
      console.warn('MetaMask connection failed or not available:', metaMaskError.message);
      try {
        await connectWalletConnect();
      } catch (walletConnectError) {
        console.error('WalletConnect connection failed:', walletConnectError.message);
        showToast(`Wallet connection failed: ${walletConnectError.message}`, 'error');
      }
    }
  }
}

async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask is not installed. Please install MetaMask and try again.');
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (accounts.length === 0) {
      throw new Error('No accounts found. Please ensure your MetaMask is set up.');
    }
    
    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Kontrollera chainId
    const network = await provider.getNetwork();
    if (network.chainId !== WARPAI_CONFIG.TARGET_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ethers.utils.hexValue(WARPAI_CONFIG.TARGET_CHAIN_ID) }],
        });
        // Re-initialize provider after chain switch
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } catch (switchError) {
        if (switchError.code === 4902) { // Chain not added
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: ethers.utils.hexValue(WARPAI_CONFIG.TARGET_CHAIN_ID),
                        chainName: WARPAI_CONFIG.TARGET_CHAIN_NAME,
                        rpcUrls: [WARPAI_CONFIG.ALCHEMY_BASE_API_URL.replace(`/${window.ALCHEMY_API_KEY || 'YOUR_ALCHEMY_BASE_KEY'}`, '')], // Remove key for rpcUrls
                        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH'},
                        // blockExplorerUrls: ['https://basescan.org'] // Optional
                    }]
                });
                provider = new ethers.providers.Web3Provider(window.ethereum);
            } catch (addError) {
                throw new Error(`Failed to switch to ${WARPAI_CONFIG.TARGET_CHAIN_NAME}. Please add it manually. Error: ${addError.message}`);
            }
        } else {
            throw new Error(`Failed to switch to ${WARPAI_CONFIG.TARGET_CHAIN_NAME}. Please switch manually. Error: ${switchError.message}`);
        }
      }
    }
    
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    currentWalletType = 'metamask';

    // Lyssna på konto- och nätverksbyten för MetaMask
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    await onSuccessfulConnect();
  } catch (error) {
    console.error('MetaMask connection error:', error);
    throw error; // Kasta vidare för att hanteras av handleConnectDisconnect
  }
}

async function connectWalletConnect() {
  try {
    walletConnectProvider = new WalletConnectProvider.default({
      rpc: {
        [WARPAI_CONFIG.TARGET_CHAIN_ID]: WARPAI_CONFIG.ALCHEMY_BASE_API_URL
      },
      chainId: WARPAI_CONFIG.TARGET_CHAIN_ID,
      // project Id for v1 can be considered the API key you got from WC
      // infuraId / rpc is preferred over projectId for WC v1 provider.
      // The 'key' c0aa1... in your project overview seems like a v1 key.
    });

    walletConnectProvider.on('display_uri', (err, payload) => {
      if (err) {
        console.error('WalletConnect display_uri error:', err);
        return;
      }
      const uri = payload.params[0];
      if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
        // Försök öppna Trust Wallet direkt på mobil
        setTimeout(() => {
          window.open(`${WARPAI_CONFIG.TRUST_WALLET_URI_FALLBACK}${encodeURIComponent(uri)}`, '_blank');
        }, 300); // Liten fördröjning
      }
      if (qrCodeDiv && qrModal) { // Visa alltid QR-kod
        qrCodeDiv.innerHTML = ''; // Rensa tidigare QR
        new QRCode(qrCodeDiv, { text: uri, width: 200, height: 200, colorDark: "#ffffff", colorLight: "#1f232b" });
        qrModal.classList.remove('hidden');
      }
    });

    await walletConnectProvider.enable(); // Öppnar modal / triggar display_uri

    provider = new ethers.providers.Web3Provider(walletConnectProvider);
    signer = provider.getSigner();
    userAddress = await signer.getAddress();
    currentWalletType = 'walletconnect';

    // Lyssna på disconnect och chain/accounts changed för WalletConnect
    walletConnectProvider.on("disconnect", handleDisconnectEventWC);
    walletConnectProvider.on("accountsChanged", handleAccountsChangedWC);
    walletConnectProvider.on("chainChanged", handleChainChangedWC);

    await onSuccessfulConnect();
  } catch (error) {
    console.error('WalletConnect connection error:', error);
    if (qrModal) qrModal.classList.add('hidden'); // Dölj QR om det misslyckades
    throw error; // Kasta vidare
  }
}

async function onSuccessfulConnect() {
  if (qrModal) qrModal.classList.add('hidden');
  updateWalletUI();
  await loadOnchainData(); // Hämta data som XP etc.
  showToast(`Wallet connected: ${shortenAddress(userAddress)}`, 'success');
  // Uppdatera UI-element som kan vara beroende av anslutningsstatus
  const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
  if (disconnectProfileBtn) disconnectProfileBtn.style.display = 'inline-block';
  const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
  if (connectWalletProfileBtn) connectWalletProfileBtn.style.display = 'none';
}

// I app.js, ersätt din nuvarande disconnectWallet funktion med denna:
async function disconnectWallet() {
  try {
    if (currentWalletType === 'walletconnect' && walletConnectProvider && walletConnectProvider.connected) {
      await walletConnectProvider.disconnect(); // Försöker koppla från sessionen
    }
    // Ta bort WalletConnects sessionsdata explicit från localStorage
    localStorage.removeItem('walletconnect'); // Nyckeln som WalletConnect v1 ofta använder

  } catch (error) {
    console.error('Error during wallet disconnect:', error);
  } finally {
    resetWalletState(); // Nollställer dina globala variabler (provider, signer, userAddress etc.)
    updateWalletUI();   // Uppdaterar UI till frånkopplat läge
    updateXPUI(0);      // Nollställer XP i UI (eller ladda från sparad data om du har det)
    showToast('Wallet disconnected', 'info');

    // Uppdatera knappar i profilsektionen (om de finns)
    const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
    if (disconnectProfileBtn) disconnectProfileBtn.style.display = 'none';
    const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
    if (connectWalletProfileBtn) connectWalletProfileBtn.style.display = 'inline-block';
  }
}

function resetWalletState() {
  provider = null;
  signer = null;
  userAddress = null;
  currentWalletType = null;
  walletConnectProvider = null; // Rensa även WC provider instance

  // Ta bort event listeners för att undvika dubbletter om återanslutning sker
  if (window.ethereum) {
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
  }
  // WalletConnect provider listeners tas bort när providern nullställs eller kopplas ner.
}

// MetaMask event handlers
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask är låst eller inga konton anslutna
    showToast('MetaMask account disconnected or locked.', 'warning');
    disconnectWallet();
  } else if (accounts[0] !== userAddress) {
    userAddress = accounts[0];
    showToast(`Account changed to: ${shortenAddress(userAddress)}`, 'info');
    onSuccessfulConnect(); // Ladda om data för nytt konto
  }
}

async function handleChainChanged(chainIdHex) {
  const chainId = parseInt(chainIdHex, 16);
  showToast(`Network changed to Chain ID: ${chainId}`, 'info');
  if (chainId !== WARPAI_CONFIG.TARGET_CHAIN_ID) {
    showToast(`Incorrect network. Please switch to ${WARPAI_CONFIG.TARGET_CHAIN_NAME}.`, 'warning');
    // Eventuellt tvinga disconnect eller be användaren byta
    disconnectWallet(); 
  } else {
    // Ladda om provider om det behövs
    if (currentWalletType === 'metamask' && window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
    }
    onSuccessfulConnect(); // Uppdatera data för samma konto på rätt nätverk
  }
}

// WalletConnect Event Handlers
function handleDisconnectEventWC(code, reason) {
    console.log("WalletConnect session disconnected", code, reason);
    showToast('WalletConnect session ended.', 'info');
    disconnectWallet(); // Använd den globala disconnect-funktionen
}
function handleAccountsChangedWC(accounts) {
    if (accounts.length === 0) {
        disconnectWallet();
    } else if (accounts[0] !== userAddress) {
        userAddress = accounts[0];
        onSuccessfulConnect(); // Ladda om data för nytt konto
        showToast(`WalletConnect account changed to: ${shortenAddress(userAddress)}`, 'info');
    }
}
function handleChainChangedWC(chainId) {
    showToast(`WalletConnect network changed to Chain ID: ${chainId}`, 'info');
    if (chainId !== WARPAI_CONFIG.TARGET_CHAIN_ID) {
        showToast(`Incorrect network. Please switch to ${WARPAI_CONFIG.TARGET_CHAIN_NAME}.`, 'warning');
        disconnectWallet();
    } else {
        onSuccessfulConnect();
    }
}


// ----- UI UPDATE FUNCTIONS ----- //
// I app.js, ersätt din nuvarande updateWalletUI funktion med denna:
function updateWalletUI() {
  const connectWalletBtn = document.getElementById('connectWallet'); // Se till att denna hämtas korrekt
  const walletAddressDisplay = document.getElementById('walletAddress'); // Span-elementet

  if (userAddress) {
    // Ansluten: Knappen visar adressen, span-elementet döljs
    if (connectWalletBtn) {
      connectWalletBtn.textContent = shortenAddress(userAddress); // Visar t.ex. "0x123...abcd"
      // Du kan lägga till en liten ikon eller text om du vill förtydliga att det är en knapp, t.ex.:
      // connectWalletBtn.innerHTML = `${shortenAddress(userAddress)} <small>(disconnect)</small>`; 
    }
    if (walletAddressDisplay) {
      walletAddressDisplay.style.display = 'none'; // Dölj den separata text-spanen
    }
    
    // Hantera profilknapparna (om de finns och är separata)
    const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
    if (connectWalletProfileBtn) connectWalletProfileBtn.style.display = 'none';
    const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
    if (disconnectProfileBtn) disconnectProfileBtn.style.display = 'inline-block';

  } else {
    // Frånkopplad: Knappen visar "Connect Wallet", span-elementet döljs
    if (connectWalletBtn) {
      connectWalletBtn.textContent = 'Connect Wallet';
    }
    if (walletAddressDisplay) {
      walletAddressDisplay.style.display = 'none'; // Dölj den separata text-spanen
    }

    // Hantera profilknapparna
    const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
    if (connectWalletProfileBtn) connectWalletProfileBtn.style.display = 'inline-block';
    const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
    if (disconnectProfileBtn) disconnectProfileBtn.style.display = 'none';
  }

  // Se till att huvudknappens text/funktion för connect/disconnect i headern också hanteras
  // (Detta görs redan av handleConnectDisconnect som anropas av knappen)
  // Den befintliga connectWalletBtn.addEventListener('click', handleConnectDisconnect);
  // kommer fortfarande att växla mellan att ansluta och koppla från.
}

function updateXPUI(xp) {
  const currentLevel = Math.floor(xp / 200) + 1;
  const xpForNextLevel = currentLevel * 200;
  const currentXPInLevel = xp % 200;

  if (xpDisplayHeader) xpDisplayHeader.textContent = `🔥 ${xp} XP`;
  if (totalXPDisplay) totalXPDisplay.textContent = xp;
  if (currentXPDisplayHome) currentXPDisplayHome.textContent = `🔥 ${xp} XP`;
  
  // Uppdatera XP-bar och nivåinfo på Home-fliken
  const xpProgressHome = document.getElementById('xpProgressHome');
  const xpProgressLabelHome = document.getElementById('xpProgressLabelHome');
  const userLevelHome = document.getElementById('userLevelHome');

  if(xpProgressHome) xpProgressHome.value = currentXPInLevel;
  if(xpProgressHome) xpProgressHome.max = 200; // XP för en nivå
  if(xpProgressLabelHome) xpProgressLabelHome.textContent = `${currentXPInLevel}/${200} XP till Level ${currentLevel + 1}`;
  if(userLevelHome) userLevelHome.textContent = `Level ${currentLevel}`;

  // Uppdatera XP-bar och nivåinfo på Profile-fliken
  const xpProgressProfile = document.getElementById('xpProgressProfile');
  const xpToNextLevelProfile = document.getElementById('xpToNextLevelProfile'); // Span inuti small
  const userLevelProfile = document.getElementById('userLevelProfile');

  if(xpProgressProfile) xpProgressProfile.value = currentXPInLevel;
  if(xpProgressProfile) xpProgressProfile.max = 200;
  if(xpToNextLevelProfile) xpToNextLevelProfile.textContent = `${currentXPInLevel}/${200}`;
  if(userLevelProfile) userLevelProfile.textContent = `Level ${currentLevel}`;


  // Uppdatera XP progress banner
  const xpBannerFill = document.getElementById('xpBannerFill');
  const bannerText = document.querySelector('.xp-progress-banner span');
  if (xpBannerFill) {
    const progressPercent = Math.min((currentXPInLevel / 200) * 100, 100);
    xpBannerFill.style.width = `${progressPercent}%`;
  }
  if (bannerText) {
      bannerText.textContent = `Level ${currentLevel} → ${xpForNextLevel} XP | Bonus: +${currentLevel * 5}%`; // Exempel bonus
  }

  // Global XP fill (om klassen .xp-fill används generellt)
  document.querySelectorAll('.xp-fill').forEach(el => {
    if (el.id !== 'xpBannerFill') { // Undvik att dubbeluppdatera bannern
        const progressPercent = Math.min((currentXPInLevel / 200) * 100, 100);
        el.style.width = `${progressPercent}%`;
    }
  });
}


// ----- DATA FETCHING ----- //
async function loadOnchainData() {
  if (!userAddress || !provider) {
    console.warn('Cannot load onchain data: No user address or provider.');
    return;
  }

  // Använd en read-only provider för att hämta data för att inte trigga signaturer
  // Om ALCHEMY_API_KEY är tillgänglig och korrekt via WARPAI_CONFIG
  let readProvider = provider; // Använd ansluten provider som default
  if (WARPAI_CONFIG.ALCHEMY_BASE_API_URL.includes('YOUR_ALCHEMY') === false) {
      try {
        readProvider = new ethers.providers.JsonRpcProvider(WARPAI_CONFIG.ALCHEMY_BASE_API_URL);
      } catch(e) { console.warn("Could not create Alchemy provider for read, using connected provider.", e)}
  }


  try {
    const txCount = await readProvider.getTransactionCount(userAddress);
    const calculatedXP = txCount * 10; // Exempel: 10 XP per transaktion
    updateXPUI(calculatedXP);

    // Uppdatera "Latest Activity" på Track-fliken (exempel)
    const latestActivityEl = document.getElementById('latestActivity');
    const activityResultEl = document.getElementById('activityResult');
    if (latestActivityEl && activityResultEl) {
      const blockNumber = await readProvider.getBlockNumber();
      // Ethers v5 getHistory är deprecated. Använd Alchemy SDK eller Etherscan API för transaktionshistorik.
      // För enkelhetens skull, mockar vi detta eller visar bara senaste block.
      // Alternativt, använd Alchemy's `alchemy_getAssetTransfers` eller Etherscan API.
      // För nu, bara ett exempel:
      // latestActivityEl.textContent = `Checked activity up to block ${blockNumber}. History requires advanced API.`;
      // activityResultEl.textContent = '';
      // Detta är en placeholder. Fullständig transaktionshistorik är mer komplex.
      // Istället, ett enklare exempel: senaste transaktion (om möjligt, annars mock)
        try {
            const history = await readProvider.getHistory(userAddress, blockNumber - 10, blockNumber); // Sista 10 blocken
            if (history && history.length > 0) {
                const lastTx = history[history.length - 1];
                const ethValue = ethers.utils.formatEther(lastTx.value || 0);
                latestActivityEl.textContent = `↪ To: ${shortenAddress(lastTx.to || '')} — ${ethValue} ETH @ Block ${lastTx.blockNumber}`;
                // Mockat dollarvärde
                activityResultEl.textContent = `Value (mock): $${(parseFloat(ethValue) * 3000).toFixed(2)}`; 
            } else {
                latestActivityEl.textContent = 'No recent transactions found in last 10 blocks.';
                activityResultEl.textContent = '';
            }
        } catch (historyError) {
            console.warn("Could not fetch transaction history (getHistory might be limited on public RPCs):", historyError);
            latestActivityEl.textContent = 'Could not fetch transaction history.';
            activityResultEl.textContent = '';
        }

    }
    // Uppdatera annan data på Track-fliken
    updateTrackTabData(readProvider);

  } catch (error) {
    console.error('Error fetching onchain data:', error);
    showToast('Could not load onchain data.', 'error');
  }
}

async function updateTrackTabData(readProviderInstance) {
    if (!userAddress || !readProviderInstance) return;
    const readProvider = readProviderInstance; // Använd den provider som skickas in

    try {
      // Base Gas
      const gasPrice = await readProvider.getGasPrice();
      const baseGasEl = document.getElementById('baseGas');
      if (baseGasEl) baseGasEl.textContent = parseFloat(ethers.utils.formatUnits(gasPrice, 'gwei')).toFixed(2);

      // Mockad data (som i din ursprungliga kod, men kan göras dynamisk om API finns)
      const gasFees30dEl = document.getElementById('gasFees30d');
      if (gasFees30dEl) gasFees30dEl.textContent = "$12.34 (mock)"; 
      const avgGasEl = document.getElementById('avgGas');
      if (avgGasEl) avgGasEl.textContent = "45.67 Gwei (mock)";
      const pnlTodayEl = document.getElementById('pnlToday');
      if (pnlTodayEl) pnlTodayEl.textContent = "+ $1.25 (mock)";

      // Tokens Minted (baserat på transaktionsantal som en proxy)
      const txCount = await readProvider.getTransactionCount(userAddress);
      const tokensMintedEl = document.getElementById('tokensMinted');
      if (tokensMintedEl) tokensMintedEl.textContent = txCount; // Eller annan logik för mints

      // ETH Moved (visar nuvarande balans som proxy)
      const balance = await readProvider.getBalance(userAddress);
      const ethMovedEl = document.getElementById('ethMoved');
      if (ethMovedEl) ethMovedEl.textContent = `${parseFloat(ethers.utils.formatEther(balance)).toFixed(4)} ETH`;
      
      const volume30dEl = document.getElementById('volume30d');
      if (volume30dEl) volume30dEl.textContent = `$${(parseFloat(ethers.utils.formatEther(balance)) * 3000).toFixed(2)} (bal*price mock)`;


      // Connected dApps (mockad lista)
      const connectedDappsEl = document.getElementById('connectedDapps');
      if (connectedDappsEl) connectedDappsEl.innerHTML = "<li>Zora (mock)</li><li>OpenSea (mock)</li><li>Mirror (mock)</li>";

    } catch (error) {
      console.error("Error updating Track tab data:", error);
      showToast('Could not update some tracking data.', 'warning');
    }
}


// ----- ACTIONS & FEATURES ----- //
function handleClaimToken() {
  // Mockad WAI-claim
  const waiBalanceEl = document.getElementById('waiBalance');
  const claimHistoryEl = document.getElementById('claimHistory');

  if (waiBalanceEl) {
    let currentBalance = parseFloat(waiBalanceEl.textContent.match(/(\d+\.?\d*)/)?.[0]) || 0;
    currentBalance += 5; // Claim 5 WAI
    waiBalanceEl.textContent = `Balance: ${currentBalance.toFixed(2)} WAI`;
  }

  if (claimHistoryEl) {
    const listItem = document.createElement('li');
    const now = new Date();
    listItem.textContent = `${now.toISOString().split('T')[0]}: +5 WAI – daily claim`;
    claimHistoryEl.prepend(listItem); // Lägg till överst i listan
  }
  showWaiClaimedMessage(); // Visuell feedback
  showConfetti(); // Extra bling
  showToast('Claimed 5 WAI!', 'success');
}

// Ingen knapp för claimXpBtn i HTML, så denna funktion är f.n. inte kopplad.
// const claimXpBtn = document.getElementById('claimXpBtn');
// if (claimXpBtn) {
//   claimXpBtn.addEventListener('click', () => {
//     const currentTotalXP = parseInt(totalXPDisplay?.textContent || '0');
//     updateXPUI(currentTotalXP + 10); // Lägg till 10 XP
//     showToast('Claimed 10 XP!', 'success');
//   });
// }

function handleCopyReferral() {
  const referralLink = userAddress ? `https://warp-ai-final.vercel.app/?ref=${userAddress}` : 'https://warp-ai-final.vercel.app';
  navigator.clipboard.writeText(referralLink).then(() => {
    showToast('✅ Referral link copied!', 'success');
  }).catch(err => {
    console.error('Failed to copy referral link:', err);
    showToast('Could not copy link.', 'error');
  });
}

function handleShare(platform, context = 'generic') {
  const referralLink = userAddress ? `https://warp-ai-final.vercel.app/?ref=${userAddress}` : 'https://warp-ai-final.vercel.app';
  let shareText = `Check out WarpAi! Track your onchain activity and earn XP/rewards. ${referralLink} #WarpAi`;
  let shareURL = '';

  if (platform === 'farcaster') {
    shareText = encodeURIComponent(shareText);
    shareURL = `https://warpcast.com/~/compose?text=${shareText}&embeds[]=${encodeURIComponent(referralLink)}`;
  } else if (platform === 'x') {
    shareText = encodeURIComponent(shareText);
    shareURL = `https://twitter.com/intent/tweet?text=${shareText}`;
  } else {
    console.warn('Unsupported share platform:', platform);
    return;
  }

  window.open(shareURL, '_blank');
  showToast(`Shared on ${platform}! (mock)`, 'success');
  // Här kan logik för att ge belöning för delning läggas till
  // t.ex. updateXPUI(currentXP + 5);
}


// ----- UTILITY & UI FEEDBACK FUNCTIONS ----- //
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'toast-notification'; // Klass för styling
  
  let backgroundColor = '#333'; // Default info
  if (type === 'success') backgroundColor = '#4caf50';
  else if (type === 'error') backgroundColor = '#f44336';
  else if (type === 'warning') backgroundColor = '#ff9800';

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: backgroundColor,
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    zIndex: '10001', // Över modaler och onboarding
    fontSize: '0.9rem',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
  });
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

function showWaiClaimedMessage() {
  const msg = document.createElement('div');
  msg.textContent = '✅ You claimed 5 WAI!';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '40%', // Justerad position
    left: '50%',
    transform: 'translate(-50%, -50%) scale(1)',
    backgroundColor: 'rgba(0,0,0,0.7)', // Lätt bakgrund
    color: '#4caf50', // Grön text
    fontSize: '1.8rem', // Större text
    fontWeight: 'bold',
    padding: '20px',
    borderRadius: '10px',
    zIndex: '10002', // Högst upp
    textShadow: '0 0 8px black',
    opacity: '0',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
  });
  document.body.appendChild(msg);
  
  // Fade in and pop effect
  requestAnimationFrame(() => {
    msg.style.opacity = '1';
    msg.style.transform = 'translate(-50%, -50%) scale(1.1)';
    setTimeout(() => {
        msg.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 300);
  });

  setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => msg.remove(), 500);
  }, 2500);
}

function showConfetti() {
  for (let i = 0; i < 50; i++) { // Fler confetti
    const confetti = document.createElement('div');
    Object.assign(confetti.style, {
      position: 'fixed',
      width: `${Math.random() * 10 + 5}px`, // Varierande storlek
      height: `${Math.random() * 10 + 5}px`,
      backgroundColor: `hsl(${Math.random() * 360}, 100%, 60%)`,
      top: `${Math.random() * 20 + 5}%`, // Starta högre upp
      left: `${Math.random() * 100}%`,
      borderRadius: '50%',
      opacity: '1',
      zIndex: '10001', // Under WAI claimed message men över annat
      transition: 'transform 3s ease-out, opacity 3s ease-out' // Längre animation
    });
    document.body.appendChild(confetti);
    
    const fallDistance = Math.random() * 300 + 200;
    const rotation = Math.random() * 720 - 360; // Mer rotation

    requestAnimationFrame(() => {
      confetti.style.transform = `translateY(${fallDistance}px) rotate(${rotation}deg)`;
      confetti.style.opacity = '0';
    });
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Globala funktioner för modals (som i din ursprungliga kod)
// Se till att motsvarande element finns i index.html
window.closeQrModal = () => {
    if (qrModal) qrModal.classList.add('hidden');
    // Om WalletConnect-processen avbröts under QR-visning, hantera det
    if (walletConnectProvider && !userAddress) {
        // Detta är svårt att hantera perfekt utan state i WC providern,
        // men vi kan försöka städa upp om användaren stänger QR manuellt.
        // walletConnectProvider.close(); // Kan vara för aggressivt
        console.log("QR Modal closed by user.");
    }
};
window.toggleFAQ = () => document.getElementById('faqModal')?.classList.toggle('hidden');
window.toggleXpInfo = () => document.getElementById('xpInfoModal')?.classList.toggle('hidden');
window.toggleWarpInfo = () => document.getElementById('warpInfoModal')?.classList.toggle('hidden');
