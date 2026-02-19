# WebSell Business Site

## Implementation Plan
1. Define content model in `config.js` to centralize all dynamic content.
2. Build semantic HTML structure in `index.html` with section anchors.
3. Add styling in `assets/css/styles.css` to match the reference layout (hero, cards, split sections).
4. Implement config-driven rendering in `main.js` for hero, services, about, team, and contact.
5. Document deployment and email architecture in this README.

## Folder Structure
```
/root
  index.html
  config.js
  main.js
  README.md
  /assets
    /css
      styles.css
    /js
    /images
```

## Config-Driven Content
All copy and data live in `config.js`. Add/remove services or team members and the UI updates automatically.

Key arrays:
- `services`: Cards in the Services section.
- `team`: Cards in the Team section.

Additional content is driven by:
- `hero`, `stats`, `about`, `strengths`, `presence`, `contactSection`, `footer`.

## How to Update Content (Admin)
1. Open `config.js`.
2. Edit text fields like `site.name`, `contact.email`, etc.
3. Add a service:
```
services: [
  { title: "New Service", description: "New description" }
]
```
4. Add a team member:
```
team: [
  { name: "Name", role: "Role", email: "email@example.com" }
]
```
5. Refresh the browser.

## Local Preview
Open `index.html` directly in a browser. No build step required.

## Deployment Strategy
### Option A: Static Hosting (Recommended)
- Netlify, Cloudflare Pages, or Vercel static hosting.
- Deploy the entire `/root` directory.
- Configure a custom domain to point to the provider.

### Option B: Self-Hosted Static Server
- Use Nginx to serve the `/root` directory.
- Enable HTTPS via Let’s Encrypt.

## Email Setup Architecture (Self-Hosted)
### Overview
A standard, production-safe stack:
- MTA: Postfix (SMTP)
- IMAP/POP: Dovecot
- Anti-spam: Rspamd
- TLS: Let’s Encrypt + certbot
- DNS: SPF, DKIM, DMARC, and PTR records

### High-Level Architecture
1. **Mail Server VM** on a fixed IP (separate from web hosting).
2. **Postfix** handles inbound/outbound SMTP.
3. **Dovecot** provides IMAP for mailboxes.
4. **Rspamd** filters spam and adds DKIM signing.
5. **Nginx** (optional) for webmail (Roundcube) behind HTTPS.

### Required DNS Records
- `A` record for `mail.yourdomain.com` → server IP
- `MX` record for `yourdomain.com` → `mail.yourdomain.com`
- `TXT` SPF: `v=spf1 mx -all`
- `TXT` DKIM: from Rspamd-generated key
- `TXT` DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com`
- `PTR` (reverse DNS): IP → `mail.yourdomain.com`

### Operational Notes
- Use separate mailboxes for `admin@`, `support@`, `sales@`.
- Enforce strong passwords and 2FA in webmail.
- Enable automatic security updates.
- Monitor mail queues and blacklists.
- Back up `/var/mail`, `/etc/postfix`, `/etc/dovecot`, `/var/lib/rspamd`.

## Admin Runbook
- Content edits: `config.js`
- Layout edits: `index.html`
- Styling: `assets/css/styles.css`
- Behavior: `main.js`

## Tech Notes
- No frameworks. Vanilla HTML/CSS/JS only.
- Config-first data model for consistent updates.
