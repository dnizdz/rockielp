(function () {
  const qs = (sel) => document.querySelector(sel);
  const el = (tag, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  };

  const safe = (value, fallback = "") => (value ? value : fallback);

  const applyText = (selector, value) => {
    const node = qs(selector);
    if (node) node.textContent = value;
  };

  const applyLink = (selector, href, label) => {
    const node = qs(selector);
    if (!node) return;
    if (href) node.setAttribute("href", href);
    if (label) node.textContent = label;
  };

  const { site, contact, social, services, team, hero, stats, about, strengths, presence, contactSection, footer } = CONFIG;

  applyText("#siteName", safe(site.name));
  applyText("#siteTagline", safe(site.tagline));
  applyText("#heroTitle", safe(hero.title, site.name));
  applyText("#heroDescription", safe(hero.description, site.description));

  applyText("#aboutTitle", safe(about.title));
  applyText("#aboutBody", safe(about.body));

  applyText("#contactTitle", safe(contactSection.title));
  applyText("#contactBody", safe(contactSection.body));

  applyText("#footerName", safe(site.name));
  applyText("#footerTagline", safe(footer.tagline));
  applyText("#footerContact", safe(contact.email));
  applyText("#footerPhone", safe(contact.phone));
  applyText("#footerCopyright", safe(footer.copyright));

  applyLink("#contactEmail", `mailto:${contact.email}`, contact.email);
  applyLink("#contactPhone", `tel:${contact.phone.replace(/[^+\d]/g, "")}`, contact.phone);
  applyText("#contactAddress", safe(contact.address));

  applyLink("#contactCta", contactSection.ctaLink, contactSection.cta);
  applyLink("#primaryCta", contactSection.ctaLink, contactSection.cta);

  const statsGrid = qs("#statsGrid");
  statsGrid.innerHTML = "";
  stats.forEach((item) => {
    const card = el("div", "stat-card");
    const value = el("h3");
    value.textContent = item.value;
    const label = el("p");
    label.textContent = item.label;
    card.append(value, label);
    statsGrid.append(card);
  });

  const servicesGrid = qs("#servicesGrid");
  servicesGrid.innerHTML = "";
  services.forEach((service) => {
    const card = el("div", "card");
    const title = el("h3");
    title.textContent = service.title;
    const desc = el("p");
    desc.textContent = service.description;
    card.append(title, desc);
    servicesGrid.append(card);
  });

  const strengthsList = qs("#strengthsList");
  strengthsList.innerHTML = "";
  strengths.forEach((item) => {
    const pill = el("span", "pill");
    pill.textContent = item;
    strengthsList.append(pill);
  });

  const presenceGrid = qs("#presenceGrid");
  presenceGrid.innerHTML = "";
  presence.forEach((item) => {
    const card = el("div", "presence-card");
    const title = el("h3");
    title.textContent = item.title;
    const desc = el("p");
    desc.textContent = item.description;
    card.append(title, desc);
    presenceGrid.append(card);
  });

  const teamGrid = qs("#teamGrid");
  teamGrid.innerHTML = "";
  team.forEach((member) => {
    const card = el("div", "card");
    const name = el("h3");
    name.textContent = member.name;
    const role = el("p");
    role.textContent = member.role;
    const email = el("a");
    email.textContent = member.email;
    email.href = `mailto:${member.email}`;
    email.className = "team-email";
    card.append(name, role, email);
    teamGrid.append(card);
  });

  const socialLinks = qs("#socialLinks");
  socialLinks.innerHTML = "";
  const socialItems = [
    { label: "Instagram", href: social.instagram },
    { label: "WhatsApp", href: social.whatsapp }
  ];
  socialItems.forEach((item) => {
    if (!item.href) return;
    const link = el("a");
    link.textContent = item.label;
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    socialLinks.append(link);
  });

  const navToggle = qs("#navToggle");
  const mobileNav = qs("#mobileNav");
  navToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen.toString());
  });
})();
