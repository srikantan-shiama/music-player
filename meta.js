const loginButton = document.getElementById('loginButton');
const userWallet = document.getElementById('userWallet');

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = "Metamask not installed";
        loginButton.classList.remove("bg-purple-500", "text-white");
        loginButton.classList.add("bg-gray-500", "text-gray-300", "cursor-not-allowed");
        return;
    }

    const account = localStorage.getItem('metamaskAccount');
    if (!account) {
        loginButton.innerText = "Login with Metamask";
        loginButton.onclick = loginWithMetamask;
    } else {
        loginButton.innerText = "Disconnect";
        userWallet.innerText = localStorage.getItem('accountAbrev');
        loginButton.onclick = signOutofMetamask;
    }
}

async function loginWithMetamask() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) return;

        const account = accounts[0];
        localStorage.setItem('metamaskAccount', account);
        const accountAbrev = account.slice(0, 4) + '...' + account.slice(-2);
        localStorage.setItem('accountAbrev', accountAbrev);
        userWallet.innerText = accountAbrev;

        loginButton.innerText = "Disconnect";
        loginButton.onclick = signOutofMetamask;
    } catch (e) {
        console.error(e.message);
    }
}

function signOutofMetamask() {
    localStorage.removeItem('metamaskAccount');
    localStorage.removeItem('accountAbrev');
    userWallet.innerText = '';
    loginButton.innerText = 'Login with MetaMask';
    loginButton.onclick = loginWithMetamask;
}

window.addEventListener('DOMContentLoaded', toggleButton);
