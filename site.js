/* P&S — shared header/footer + simple i18n
   The translations are kept inline so each page stays self-contained-ish. */

(function () {
  const PAGES = [
    { href: "index.html",     pt: "Home",        en: "Home" },
    { href: "relatorios.html",pt: "Relatórios",  en: "Reports" },
    { href: "sobre.html",     pt: "Sobre",       en: "About" },
    { href: "historia.html",  pt: "História",    en: "History" },
    { href: "contato.html",   pt: "Contato",     en: "Contact" },
  ];

  const FOOTER_TXT = {
    pt: {
      about:    "Sobre",
      history:  "História",
      reports:  "Relatórios",
      contact:  "Contato",
      tagline:  "Análise macroeconômica independente para clientes institucionais.",
      address:  "R. Alves Guimarães 462 cj 93\n05410-000 São Paulo SP",
      phone:    "+55 11 3061 0600",
      legal:    "© 2026 Pinotti & Schwartsman Associados. Todos os direitos reservados.",
    },
    en: {
      about:    "About",
      history:  "History",
      reports:  "Reports",
      contact:  "Contact",
      tagline:  "Independent macroeconomic research for institutional clients.",
      address:  "R. Alves Guimarães 462 cj 93\n05410-000 São Paulo, Brazil",
      phone:    "+55 11 3061 0600",
      legal:    "© 2026 Pinotti & Schwartsman Associados. All rights reserved.",
    }
  };

  function getLang() {
    try {
      return localStorage.getItem("ps-lang") || "pt";
    } catch (_) {
      return "pt";
    }
  }
  function setLang(l) {
    try {
      localStorage.setItem("ps-lang", l);
    } catch (_) {}
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
    applyI18n();
  }

  function applyI18n() {
    const lang = getLang();
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    // Toggle [data-pt]/[data-en] elements
    document.querySelectorAll("[data-pt]").forEach(el => {
      const v = el.getAttribute("data-" + lang);
      if (v != null) el.textContent = v;
    });
    // Update lang button states
    document.querySelectorAll(".lang button").forEach(b => {
      b.classList.toggle("on", b.dataset.lang === lang);
    });
    // Update nav labels
    document.querySelectorAll(".nav a[data-page]").forEach(a => {
      const p = PAGES.find(x => x.href === a.dataset.page);
      if (p) a.textContent = p[lang];
    });
    // Update footer
    const F = FOOTER_TXT[lang];
    document.querySelectorAll("[data-footer]").forEach(el => {
      const k = el.dataset.footer;
      if (F[k] != null) el.textContent = F[k];
    });
  }

  function buildTopbar() {
    return `
      <div class="topbar">
        <div class="container">
          <a href="tel:+551130610600">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            +55 11 3061 0600
          </a>
          <a href="https://wa.me/5511971061993" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            +55 11 97106-1993
          </a>
          <a href="mailto:contato@psassociados.com">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            contato@psassociados.com
          </a>
        </div>
      </div>
    `;
  }

  function buildHeader(activePage) {
    const lang = getLang();
    const navLinks = PAGES.map(p =>
      `<a href="${p.href}" data-page="${p.href}" ${p.href === activePage ? 'class="active"' : ''}>${p[lang]}</a>`
    ).join("");
    return buildTopbar() + `
      <header class="site-header">
        <div class="container row">
          <a href="index.html" class="brand" aria-label="Pinotti &amp; Schwartsman Associados">
            <img src="assets/ps-logo.png" alt="Pinotti &amp; Schwartsman Associados" />
          </a>
          <nav class="nav">${navLinks}
            <div class="lang lang-mobile" role="group" aria-label="Language">
              <button data-lang="pt" type="button">PORT</button>
              <button data-lang="en" type="button">ENG</button>
            </div>
          </nav>
          <button class="menu-toggle" type="button" aria-label="Menu" aria-controls="site-nav" aria-expanded="false">
            <span></span>
          </button>
          <div class="lang lang-desktop" role="group" aria-label="Language">
            <button data-lang="pt" type="button">PORT</button>
            <button data-lang="en" type="button">ENG</button>
          </div>
        </div>
      </header>
    `;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="grid">
            <div>
              <div class="wordmark">Pinotti &amp;<br/>Schwartsman</div>
              <p class="small" data-footer="tagline">Análise macroeconômica independente para clientes institucionais.</p>
            </div>
            <div>
              <h4 data-pt="Navegação" data-en="Navigation">Navegação</h4>
              <ul>
                <li><a href="relatorios.html" data-footer="reports">Relatórios</a></li>
                <li><a href="sobre.html"      data-footer="about">Sobre</a></li>
                <li><a href="historia.html"   data-footer="history">História</a></li>
                <li><a href="contato.html"    data-footer="contact">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 data-pt="Endereço" data-en="Address">Endereço</h4>
              <p class="small footer-address" data-footer="address">R. Alves Guimarães 462 cj 93
05410-000 São Paulo SP</p>
            </div>
            <div>
              <h4 data-pt="Contato" data-en="Contact">Contato</h4>
              <ul>
                <li data-footer="phone">+55 11 3061 0600</li>
                <li><a href="mailto:contato@psassociados.com">contato@psassociados.com</a></li>
              </ul>
            </div>
          </div>
          <div class="legal">
            <span data-footer="legal">© 2026 Pinotti &amp; Schwartsman Associados. Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    `;
  }

  function init() {
    const headerSlot = document.querySelector("[data-slot=header]");
    const footerSlot = document.querySelector("[data-slot=footer]");
    if (headerSlot) {
      const active = headerSlot.dataset.active || "index.html";
      headerSlot.outerHTML = buildHeader(active);
    }
    if (footerSlot) {
      footerSlot.outerHTML = buildFooter();
    }
    document.querySelectorAll(".lang button").forEach(b => {
      b.addEventListener("click", () => setLang(b.dataset.lang));
    });
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    if (menuToggle && nav) {
      nav.id = "site-nav";
      menuToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          nav.classList.remove("open");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
    initContactForm();
    applyI18n();
  }

  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const lang = getLang();
      const subject = lang === "pt"
        ? "Solicitação de contato institucional"
        : "Institutional contact request";
      const labels = lang === "pt"
        ? {
            name: "Nome",
            company: "Empresa",
            email: "Email",
            phone: "Telefone",
            institution: "Tipo de instituição",
            message: "Mensagem"
          }
        : {
            name: "Name",
            company: "Company",
            email: "Email",
            phone: "Phone",
            institution: "Institution type",
            message: "Message"
          };
      const body = Object.keys(labels)
        .map(key => `${labels[key]}: ${data.get(key) || ""}`)
        .join("\n");
      const mailto = `mailto:contato@psassociados.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = form.querySelector("[data-form-status]");

      if (status) {
        status.hidden = false;
      }
      window.location.href = mailto;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
