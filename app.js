/* RESET & BODY */
body {
  margin: 0;
  font-family: 'Arial', sans-serif; /* Överväg ett mer "crypto/nörd-stil" typsnitt om specifikt önskas */
  background-color: #0f1115; /* Mörkt tema som standard */
  color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease; /* Behålls för eventuella framtida dynamiska ändringar */
  overflow-x: hidden; /* Förhindra horisontell scroll */
  max-width: 100vw;
}

/* ONBOARDING OVERLAY */
#onboardingOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95); /* Något mörkare för tydligare fokus */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Högst upp initialt */
  opacity: 1;
}

.onboarding-content img {
  width: 200px; /* Justerad storlek för onboarding-logga */
  height: auto; /* Behåll proportioner */
}

.fade-in-logo {
  animation: fadeIn 1s ease-in forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.fade-out-logo {
  animation: fadeOut 0.5s ease-out forwards;
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* HEADER */
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.8rem; /* Lite mer padding */
  background-color: #12141a;
  border-bottom: 1px solid #292d36;
  position: sticky; /* Kan vara bra för header */
  top: 0;
  z-index: 100; /* Se till att den är över sidinnehåll vid scroll */
}

.logo-title {
  display: flex;
  align-items: center;
}

.logo-icon-fixed {
  width: auto; 
  height: 32px; /* Anpassad storlek för header-logga */
  background: transparent;
  border: none;
  vertical-align: middle;
}

.wallet-ui {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.wallet-status {
  display: flex;
  align-items: center;
  gap: 0.75rem; /* Ökat gap */
  font-size: 0.8rem;
}

#walletUI {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

#walletAddress {
  background-color: #2a2d35;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

#connectWallet {
  padding: 0.4rem 0.8rem;
  background-color: #8a4af3; /* Primär accentfärg */
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#connectWallet:hover {
  background-color: #7b3fdb;
}

/* Styles for settings cog and dark mode toggle removed as per minimalist spec */

/* XP PROGRESS BANNER */
.xp-progress-banner {
  background-color: #1b1d23;
  padding: 0.4rem 1rem; /* Justerad padding */
  text-align: center;
  font-size: 0.75rem; /* Något mindre text */
  border-top: 1px solid #292d36;
  border-bottom: 1px solid #292d36;
}

.xp-progress-banner .xp-bar {
  margin-top: 0.3rem;
  height: 8px; /* Något tjockare */
  background: #3a3d45; /* Mörkare bakgrund för bar */
  border-radius: 8px;
  overflow: hidden;
}

.xp-progress-banner .xp-fill,
.xp-fill { /* Kombinerad för alla .xp-fill */
  height: 100%;
  background: linear-gradient(to right, #4caf50, #00e676); /* Behållen gradient */
  transition: width 0.5s ease-in-out;
  border-radius: 8px; /* Matchar parent bar */
}


/* NAVIGATION TABS */
.nav-tabs {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem 0; /* Justerad padding */
  background-color: #12141a;
  border-bottom: 1px solid #292d36;
}

.tab-button {
  background: none;
  border: none;
  color: #b0b3b8; /* Något ljusare inaktiv färg */
  font-size: 0.8rem; /* Något mindre */
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 0.5rem; /* Justerad padding */
  transition: color 0.3s ease, border-bottom 0.3s ease;
  border-bottom: 2px solid transparent; /* För aktiv indikator */
}

.tab-button.active {
  color: #a674ff; /* Lila accent för aktiv flik */
  border-bottom: 2px solid #a674ff;
}

.tab-button:hover {
  color: #c9a3ff;
}

/* MAIN CONTENT AREA */
main {
  padding: 0.8rem 0.6rem; /* Justerad padding */
  max-width: 480px;
  margin: 0 auto; /* Centrerad och mobilanpassad bredd */
  overflow-x: hidden; /* Redan i body, men skadar inte här */
}

/* HERO SECTION (om den används generellt) */
.hero {
  text-align: center;
  margin-bottom: 1rem; /* Ökat marginal */
}

.hero h2 { /* Om h2 används i hero */
  font-size: 1.5rem;
  margin-bottom: 0.3rem;
  color: #a674ff;
}

.subtitle { /* Om subtitle används i hero */
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 0;
  margin-bottom: 1rem;
}

/* CARD SYSTEM */
.card-grid, .custom-home-grid { /* Gemensamma stilar för grid-containrar */
  display: grid;
  grid-template-columns: 1fr 1fr; /* Standard 2 kolumner */
  gap: 0.8rem; /* Ökat gap */
}

.custom-home-grid { /* Specifikt för home-grid om det behövs */
  grid-template-rows: auto auto auto; /* Som tidigare */
}

.card {
  background-color: #1b1d23;
  padding: 0.8rem; /* Ökad padding */
  border-radius: 12px; /* Mer rundade hörn */
  font-size: 0.8rem; /* Baskontentstorlek i kort */
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #292d36; /* Tydligare kant */
}

.card:hover {
  box-shadow: 0 4px 15px rgba(138, 74, 243, 0.2); /* Lila skugga vid hover */
  background-color: #20232a;
}

.card h3 {
  margin: 0 0 0.6rem;
  font-size: 0.9rem; /* Något större card-titel */
  color: #e4e6eb; /* Ljusare titel */
}

.card p,
.card ul {
  margin: 0 0 0.6rem;
  font-size: 0.75rem; /* Något större text i kort */
  color: #b0b3b8; /* Ljusare p-text */
  line-height: 1.5;
}

.card ul {
  padding-left: 1.2rem; /* Justerad padding för listor */
  text-align: left;
  list-style-type: disc; /* Standard list-style */
}

.card ul li::marker {
  color: #a674ff; /* Färg på listpunkter */
}

.card button {
  padding: 0.5rem 1rem; /* Ökad padding på knappar */
  background-color: #4caf50; /* Grön standard för claim/action */
  border: none;
  border-radius: 8px; /* Mer rundade knappar */
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  width: auto; /* Inte full bredd som standard */
  margin-top: 0.5rem;
}

.card button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.card button[disabled] { /* Stil för disabled knappar i kort */
  background-color: #444 !important; /* Tydligare disabled färg */
  color: #888;
  opacity: 0.7;
  pointer-events: none;
  transform: none;
}

/* CARD VARIANTS & MODIFIERS */
.card.dark { /* Behålls om .dark har specifik betydelse utöver standard mörkt kort */
  background: linear-gradient(135deg, #8a4af3, #6a1b9a); /* Som tidigare */
  color: #fff;
  border: none; /* Ta bort border för gradientkort */
}

.card.dark h3, .card.dark p, .card.dark ul {
  color: #fff; /* Se till att text är vit på mörk gradient */
}
.card.dark ul li::marker {
  color: #fff;
}


.card.full { /* För kort som spänner båda kolumner */
  grid-column: span 2;
}

.card.tall { /* För högre kort i grid */
  grid-row: span 2;
}

.card.premium ul { /* Speciell liststil för premium-kort */
  list-style: none;
  padding-left: 0;
}

.card.premium ul li::before { /* Premium stjärn-ikon */
  content: "⭐ ";
  color: #f39c12;
  margin-right: 0.3rem;
}

.upgrade-button-green { /* Specifik klass för uppgraderingsknapp */
  background-color: #2c9463 !important; /* Tvinga färg om det behövs */
  padding: 0.6rem 1.2rem; /* Större knapp */
  font-size: 0.85rem;
}

.upgrade-button-green:hover {
  background-color: #228b53 !important;
}

/* TRACK TAB SPECIFIC */
.track-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

#refreshTrackBtn {
  background: none;
  border: none;
  color: #b0b3b8;
  font-size: 1.3rem; /* Större ikon */
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

#refreshTrackBtn:hover {
  opacity: 1;
  transform: rotate(45deg);
}

/* MODALS */
.modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.85); /* Något mörkare backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Under onboarding, men över allt annat */
  padding: 1rem; /* Padding för att inte trycka innehåll mot kanter */
}

.modal.hidden {
  display: none;
}

.modal-content {
  background-color: #1f232b; /* Något ljusare än kortbakgrund */
  padding: 1.5rem; /* Mer padding i modal */
  border-radius: 12px;
  max-width: 320px; /* Något bredare modal */
  width: 100%;
  color: white;
  text-align: left;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid #3a3d45;
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1rem; /* Mer marginal under titel */
  color: #a674ff; /* Lila titel för modal */
  font-size: 1.1rem;
}

.modal-content ul {
  padding-left: 1.2rem;
  margin-bottom: 1rem;
}
.modal-content ul li {
  margin-bottom: 0.4rem;
  font-size: 0.8rem;
  color: #ccc;
}

.modal-content button { /* Standardknapp i modal */
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  background-color: #8a4af3; /* Lila som standard i modal */
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  width: 100%; /* Fullbreddsknapp i modal */
  font-size: 0.85rem;
}

.modal-content button:hover {
  background-color: #7b3fdb;
}

/* QR Modal Specific */
#qrModal .modal-content { /* Centrera innehåll i QR-modal */
  text-align: center;
}

#qrCode {
  margin: 1.2rem auto; /* Mer marginal runt QR-kod */
  background-color: white; /* Vit bakgrund för QR-kod för läsbarhet */
  padding: 10px; /* Padding runt QR för att den inte ska nudda kanterna */
  border-radius: 8px;
  display: inline-block; /* För att padding och margin ska fungera korrekt */
}

/* UTILITY & EXTRAS */
/* Inga .info-btn, .faq-top-right, .mini-info-btn, .compact-track-hero i nuvarande HTML. Kan tas bort om de inte används. */
/* För .position-relative om det behövs någonstans. */
.position-relative {
  position: relative;
}

/* Input fields style (e.g., in Premium tab for wallet tracking) */
input[type="text"] {
  background-color: #2a2d35;
  border: 1px solid #444;
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  font-size: 0.8rem;
  width: 100%; /* Ofta önskvärt för textinput */
  box-sizing: border-box; /* Inkludera padding och border i width */
  margin-bottom: 0.5rem; /* Lite utrymme under input */
}

input[type="text"]::placeholder {
  color: #888;
}

progress { /* Basstil för progress-element */
  border-radius: 8px;
  height: 8px;
  width: 100%;
  border: 1px solid #3a3d45;
}
progress::-webkit-progress-bar {
  background-color: #3a3d45;
  border-radius: 8px;
}
progress::-webkit-progress-value {
  background-color: #4caf50; /* Grön standard för progress */
  border-radius: 8px;
  transition: width 0.5s ease;
}
progress::-moz-progress-bar { /* För Firefox */
  background-color: #4caf50;
  border-radius: 8px;
  transition: width 0.5s ease;
}

/* Toasts / Notifications (från app.js) */
/* Inga klasser definierade för showWaiClaimedMessage och showToast i CSS, de stylas inline via JS. */
/* Överväg att skapa klasser för dessa för bättre CSP och underhåll. */

/* Confetti (från app.js) */
/* Stilas inline via JS. */

'use strict';

// Konfiguration för API-nycklar och konstanter
// VIKTIGT: Dessa värden MÅSTE sättas via Vercel Environment Variables.
// Exempelvis kan Vercel bygga en env-config.js fil eller injicera dem.
// Här är de bara placeholders.
const WARPAI_CONFIG = {
  ALCHEMY_BASE_API_URL: `https://base-mainnet.g.alchemy.com/v2/${window.ALCHEMY_API_KEY || 'YOUR_ALCHEMY_BASE_KEY'}`, // Ersätt med faktisk nyckel från Vercel env
  ETHERSCAN_API_KEY: window.ETHERSCAN_API_KEY || 'YOUR_ETHERSCAN_KEY', // Ersätt med faktisk nyckel från Vercel env
  WALLETCONNECT_PROJECT_ID: window.WALLETCONNECT_PROJECT_ID || 'c0aa1ca206eb7d58226102b102ec49e9', // WalletConnect v1 "key" can be used as project ID conceptually for v1 provider
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

async function disconnectWallet() {
  try {
    if (currentWalletType === 'walletconnect' && walletConnectProvider && walletConnectProvider.connected) {
      await walletConnectProvider.disconnect();
    }
    // För MetaMask, rensa bara state, ingen specifik disconnect-metod behövs på samma sätt
  } catch (error) {
    console.error('Error during wallet disconnect:', error);
  } finally {
    resetWalletState();
    updateWalletUI();
    updateXPUI(0); // Återställ XP i UI
    // localStorage.clear(); // Överväg noga vad som ska rensas. Kanske bara anslutningsspecifik data.
    showToast('Wallet disconnected', 'info');
    
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
function updateWalletUI() {
  const sharedButtonText = userAddress ? 'Disconnect' : 'Connect Wallet';
  const sharedAddressText = userAddress ? shortenAddress(userAddress) : 'Not Connected';

  if (connectWalletBtn) connectWalletBtn.textContent = sharedButtonText;
  
  const connectWalletProfileBtn = document.getElementById('connectWalletProfile');
  if (connectWalletProfileBtn) { // Uppdatera text på profilknappen också
      connectWalletProfileBtn.textContent = sharedButtonText;
      connectWalletProfileBtn.style.display = userAddress ? 'none' : 'inline-block';
  }
  
  const disconnectProfileBtn = document.getElementById('disconnectWalletBtn');
  if (disconnectProfileBtn) {
      disconnectProfileBtn.style.display = userAddress ? 'inline-block' : 'none';
  }

  if (walletAddressDisplay) walletAddressDisplay.textContent = sharedAddressText;
  const walletAddressProfileDisplay = document.getElementById('walletAddressProfile');
  if (walletAddressProfileDisplay) walletAddressProfileDisplay.textContent = sharedAddressText;


  // Logik för att visa/dölja element baserat på anslutningsstatus
  const viewFarcasterProfileBtn = document.getElementById('viewFarcasterProfileBtn');
  const farcasterProfileTooltip = document.getElementById('farcasterProfileTooltip');
  if (viewFarcasterProfileBtn) viewFarcasterProfileBtn.disabled = !userAddress;
  if (farcasterProfileTooltip) farcasterProfileTooltip.style.display = userAddress ? 'none' : 'block';
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
