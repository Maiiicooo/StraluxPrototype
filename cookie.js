// Voeg cookie-banner en overlay dynamisch toe
document.addEventListener("DOMContentLoaded", function () {
    // Cookie HTML injecteren
    const bannerHTML = `
    <div id="cookie-overlay"></div>
    <div id="cookie-banner" style="display:none;">
      <div class="cookie-popup">
        <p>
          Deze website gebruikt cookies voor anonieme statistieken.<br>
          <a href="privacy.html">Meer info</a>
        </p>
        <button onclick="acceptCookies()">Accepteren</button>
      </div>
    </div>
  `;
    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    // CSS classes toevoegen
    const css = `
    #cookie-overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: 9998;
      pointer-events: auto;
    }

    #cookie-banner {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      font-family: 'Montserrat', sans-serif;
    }

    .cookie-popup {
      background: #000;
      color: #fff;
      border-radius: 8px;
      padding: 20px 25px;
      max-width: 300px;
      text-align: center;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }

    .cookie-popup p {
      font-size: 14px;
      margin: 0 0 15px;
    }

    .cookie-popup a {
      color: #fff;
      text-decoration: underline;
    }

    .cookie-popup button {
      background-color: #fff;
      color: #000;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .cookie-popup button:hover {
      background-color: #ccc;
    }

    body.block-scroll {
      overflow: hidden;
    }
  `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // Cookiecontrole
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        loadGoogleAnalytics();
    } else {
        document.getElementById('cookie-banner').style.display = 'block';
        document.getElementById('cookie-overlay').style.display = 'block';
        document.body.classList.add('block-scroll');
    }
});

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
    document.getElementById('cookie-overlay').style.display = 'none';
    document.body.classList.remove('block-scroll');
    loadGoogleAnalytics();
}

function loadGoogleAnalytics() {
    const scriptTag = document.createElement('script');
    scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-V0R3J6TY45";
    scriptTag.async = true;
    document.head.appendChild(scriptTag);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-V0R3J6TY45', { 'anonymize_ip': true });
}

// Reset button for testing purposes
//      <button onclick="localStorage.removeItem('cookiesAccepted'); location.reload();">
//        Reset Cookie Banner
//      </button>