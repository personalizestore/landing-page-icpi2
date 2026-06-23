// ==========================================================================
// APP LOGIC - SEGUNDA ICPI PINHAL
// Dynamically populates the landing page content based on config.js
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Validate if configuration object exists
  if (typeof CHURCH_CONFIG === "undefined") {
    console.error("Configuration object 'CHURCH_CONFIG' not found. Make sure config.js is loaded before app.js.");
    return;
  }

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Populate dynamic textual information
  initBasicInfo();
  
  // Populate schedules (Cultos)
  renderSchedules();
  
  // Populate Pix details
  initPixDetails();

  // Set up copy to clipboard functionality
  setupPixCopy();
});

/**
 * Initializes basic info like name, slogan, address, maps and social links
 */
function initBasicInfo() {
  const cfg = CHURCH_CONFIG;

  // Title and Headers
  document.title = `${cfg.churchName} - Landing Page`;
  document.getElementById("header-logo-text").textContent = cfg.churchName;
  document.getElementById("footer-logo-text").textContent = cfg.churchName;
  document.getElementById("hero-title").textContent = cfg.churchName;
  
  // Slogan / Subtitles
  if (cfg.welcomeMessage) {
    document.getElementById("hero-subtitle").innerHTML = `
      <strong>${cfg.welcomeMessage}</strong><br>
      <span style="font-size: 1.1rem; display: inline-block; margin-top: 10px; opacity: 0.85;">${cfg.welcomeSubtitle || ''}</span>
    `;
  }

  // Logo Handling
  const logoLink = document.getElementById("church-logo-link");
  if (cfg.logoPath && cfg.logoPath !== "") {
    // Try to load the image, if it fails, fallback to text (which is already default in HTML)
    const logoImg = document.createElement("img");
    logoImg.src = cfg.logoPath;
    logoImg.alt = cfg.churchName;
    logoImg.className = "logo-img";
    logoImg.onerror = () => {
      // Keep text and remove image if loading fails
      logoImg.remove();
    };
    // Prepend image to the logo link container (will show image and text, or we can hide text if logo works)
    logoLink.insertBefore(logoImg, logoLink.firstChild);
    
    // Hide text logo if image is loaded successfully (optional design choice)
    logoImg.onload = () => {
      document.getElementById("header-logo-text").style.display = "none";
    };
  }

  // Address Formatting
  const addr = cfg.address;
  const addressHtml = `${addr.street}, ${addr.neighborhood}<br>${addr.city} - ${addr.state}, CEP ${addr.zipCode}`;
  document.getElementById("address-text").innerHTML = addressHtml;
  document.getElementById("btn-maps").href = addr.mapsUrl;

  // Social Links (SVG generation for durability and styling consistency)
  const instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
  const facebookSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;

  const headerSocials = document.getElementById("header-socials");
  const footerSocials = document.getElementById("footer-socials");

  headerSocials.innerHTML = "";
  footerSocials.innerHTML = "";

  if (cfg.socials.instagram) {
    const instLinkHeader = createSocialLink(cfg.socials.instagram, instagramSvg, "Instagram");
    const instLinkFooter = createSocialLink(cfg.socials.instagram, instagramSvg, "Instagram");
    headerSocials.appendChild(instLinkHeader);
    footerSocials.appendChild(instLinkFooter);
  }

  if (cfg.socials.facebook) {
    const fbLinkHeader = createSocialLink(cfg.socials.facebook, facebookSvg, "Facebook");
    const fbLinkFooter = createSocialLink(cfg.socials.facebook, facebookSvg, "Facebook");
    headerSocials.appendChild(fbLinkHeader);
    footerSocials.appendChild(fbLinkFooter);
  }
}

/**
 * Helper to create social link buttons
 */
function createSocialLink(url, svgContent, label) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.className = "social-icon-btn";
  a.setAttribute("aria-label", label);
  a.innerHTML = svgContent;
  return a;
}

/**
 * Dynamically renders the weekly schedules (Cultos)
 */
function renderSchedules() {
  const grid = document.getElementById("cultos-grid");
  const schedules = CHURCH_CONFIG.schedules;
  
  if (!schedules || schedules.length === 0) {
    grid.innerHTML = `<div class="loading">Nenhum culto programado no momento.</div>`;
    return;
  }

  grid.innerHTML = ""; // Clear loader

  schedules.forEach(item => {
    const card = document.createElement("div");
    card.className = "culto-card";
    card.innerHTML = `
      <div class="culto-card-day">${item.day}</div>
      <div class="culto-card-time">${item.time} <span>hs</span></div>
      <h3 class="culto-card-title">${item.title}</h3>
      <p class="culto-card-desc">${item.description || ''}</p>
    `;
    grid.appendChild(card);
  });
}

/**
 * Initializes the Pix details and QR codes
 */
function initPixDetails() {
  const pix = CHURCH_CONFIG.pix;
  
  if (!pix) return;

  // General Account Pix
  if (pix.general) {
    document.getElementById("pix-general-title").textContent = pix.general.title || "Dízimos e Ofertas (Geral)";
    document.getElementById("pix-general-owner").textContent = pix.general.owner || "-";
    document.getElementById("pix-general-bank").textContent = pix.general.bank || "-";
    document.getElementById("pix-general-key-input").value = pix.general.key || "";
    
    const qrImg = document.getElementById("pix-general-qr");
    if (pix.general.qrCodePath && pix.general.qrCodePath !== "") {
      qrImg.src = pix.general.qrCodePath;
    } else {
      qrImg.style.display = "none";
    }
  }

  // Construction Account Pix
  if (pix.construction) {
    document.getElementById("pix-construction-title").textContent = pix.construction.title || "Campanha da Construção";
    document.getElementById("pix-construction-owner").textContent = pix.construction.owner || "-";
    document.getElementById("pix-construction-bank").textContent = pix.construction.bank || "-";
    document.getElementById("pix-construction-key-input").value = pix.construction.key || "";
    
    const qrImg = document.getElementById("pix-construction-qr");
    if (pix.construction.qrCodePath && pix.construction.qrCodePath !== "") {
      qrImg.src = pix.construction.qrCodePath;
    } else {
      qrImg.style.display = "none";
    }
  }
}

/**
 * Sets up the Pix copy-to-clipboard functionality and visual feedback
 */
function setupPixCopy() {
  const toast = document.getElementById("toast");
  let toastTimeout;

  const handleCopy = (inputId, buttonId) => {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    
    if (!input || !button) return;

    button.addEventListener("click", () => {
      // Select the text
      input.select();
      input.setSelectionRange(0, 99999); // For mobile devices

      // Copy text to clipboard
      navigator.clipboard.writeText(input.value)
        .then(() => {
          // Visual feedback on the button
          button.classList.add("copied");
          const originalContent = button.innerHTML;
          
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Copiado!</span>
          `;

          // Show Toast notification
          toast.classList.add("show");

          // Reset toast timeout to prevent immediate disappearance on multiple clicks
          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);

          // Reset button after 2.5 seconds
          setTimeout(() => {
            button.classList.remove("copied");
            button.innerHTML = originalContent;
          }, 2500);
        })
        .catch(err => {
          console.error("Erro ao copiar texto: ", err);
          alert("Não foi possível copiar automaticamente. Selecione o texto e copie manualmente.");
        });
    });
  };

  // Bind copy actions
  handleCopy("pix-general-key-input", "btn-copy-general");
  handleCopy("pix-construction-key-input", "btn-copy-construction");
}
